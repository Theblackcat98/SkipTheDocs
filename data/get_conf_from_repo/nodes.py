import os
import re
import yaml
from pocketflow import Node, BatchNode
from utils.crawl_github_files import crawl_github_files
from utils.call_llm import call_llm


# Helper to get content for specific file indices
def get_content_for_indices(files_data, indices):
    content_map = {}
    for i in indices:
        if 0 <= i < len(files_data):
            path, content = files_data[i]
            content_map[f"{i} # {path}"] = (
                content  # Use index + path as key for context
            )
    return content_map


class FetchRepo(Node):
    def prep(self, shared):
        repo_url = shared.get("repo_url")
        local_dir = shared.get("local_dir")
        project_name = shared.get("project_name")

        if not project_name:
            # Basic name derivation from URL or directory
            if repo_url:
                project_name = repo_url.split("/")[-1].replace(".git", "")
            else:
                project_name = os.path.basename(os.path.abspath(local_dir))
            shared["project_name"] = project_name

        # Get file patterns directly from shared
        include_patterns = shared["include_patterns"]
        exclude_patterns = shared["exclude_patterns"]
        max_file_size = shared["max_file_size"]

        return {
            "repo_url": repo_url,
            "local_dir": local_dir,
            "token": shared.get("github_token"),
            "include_patterns": include_patterns,
            "exclude_patterns": exclude_patterns,
            "max_file_size": max_file_size,
            "use_relative_paths": True,
        }

    def exec(self, prep_res):
        result = None
        if prep_res["repo_url"]:
            print(f"Crawling repository: {prep_res['repo_url']}...")
            result = crawl_github_files(
                repo_url=prep_res["repo_url"],
                token=prep_res["token"],
                include_patterns=prep_res["include_patterns"],
                exclude_patterns=prep_res["exclude_patterns"],
                max_file_size=prep_res["max_file_size"],
                use_relative_paths=prep_res["use_relative_paths"],
            )

        # Convert dict to list of tuples: [(path, content), ...]
        files_list = list((result or {}).get("files", {}).items())
        if not files_list:
            raise ValueError("Failed to fetch files")
        print(f"Fetched {len(files_list)} files.")
        return files_list

    def post(self, shared, prep_res, exec_res):
        shared["files"] = exec_res  # List of (path, content) tuples


class ExtractConfigInfo(Node): # ID config info
    def prep(self, shared):
        files_data = shared["files"]
        project_name = shared["project_name"]  # Get project name
        language = shared.get("language", "english")  # Get language
        use_cache = shared.get("use_cache", True)  # Get use_cache flag, default to True
        max_abstraction_num = shared.get("max_abstraction_num", 10)  # Get max_abstraction_num, default to 10

        # Helper to create context from files, respecting limits (basic example)
        def create_llm_context(files_data):
            context = ""
            file_info = []  # Store tuples of (index, path)
            for i, (path, content) in enumerate(files_data):
                entry = f"--- File Index {i}: {path} ---\n{content}\n\n"
                context += entry
                file_info.append((i, path))

            return context, file_info  # file_info is list of (index, path)

        context, file_info = create_llm_context(files_data)
        # Format file info for the prompt (comment is just a hint for LLM)
        file_listing_for_prompt = "\n".join(
            [f"- {idx} # {path}" for idx, path in file_info]
        )
        return (
            context,
            file_listing_for_prompt,
            len(files_data),
            project_name,
            language,
            use_cache,
            max_abstraction_num,
        )  # Return all parameters

    def exec(self, prep_res):
        (
            context,
            file_listing_for_prompt,
            file_count,
            project_name,
            language,
            use_cache,
            max_abstraction_num,
        ) = prep_res  # Unpack all parameters
        print(f"Extracting config info using LLM...")

        # Add language instruction and hints only if not English
        language_instruction = ""
        if language.lower() != "english":
            language_instruction = f"IMPORTANT: Generate the output in **{language.capitalize()}** language.\n\n"

        prompt = f"""
For the project `{project_name}`:

Codebase Context:
{context}

{language_instruction}Analyze the codebase context to locate and detail the project's configuration files.

Your primary goal is to identify where and how the project is configured. Look for configuration files, documentation about configuration, or code that defines configuration.

Based on your findings, provide the following:
1. A `summary` of how configuration is handled in this project.
2. A list of `configuration_files`, including their paths and a brief description of their purpose.
3. If you find documentation on configuration, provide a `documentation_summary` and the relevant `file_indices`.

List of file indices and paths present in the context:
{file_listing_for_prompt}

Format the output as a YAML dictionary:

```yaml
summary: |
  Brief explanation of the configuration strategy.
configuration_files:
  - file_path: "path/to/config.yaml"
    description: "Main configuration file for the application."
  - file_path: "path/to/another.config"
    description: "Handles feature flags and other settings."
documentation_summary: |
  A summary of what the documentation says about configuration.
documentation_files:
  - 0 # path/to/config_docs.md
```"""
        response = call_llm(prompt, use_cache=(use_cache and self.cur_retry == 0))  # Use cache only if enabled and not retrying

        # --- Validation ---
        yaml_str = response.strip().split("```yaml")[1].split("```")[0].strip()
        config_info = yaml.safe_load(yaml_str)

        if not isinstance(config_info, dict):
            raise ValueError("LLM Output is not a dictionary")

        validated_config_info = {}
        if "summary" in config_info and isinstance(config_info["summary"], str):
            validated_config_info["summary"] = config_info["summary"]
        else:
            raise ValueError("Missing or invalid 'summary' in LLM output")

        if "configuration_files" in config_info and isinstance(config_info["configuration_files"], list):
            validated_config_info["configuration_files"] = config_info["configuration_files"]
        else:
            validated_config_info["configuration_files"] = []

        if "documentation_summary" in config_info and isinstance(config_info["documentation_summary"], str):
            validated_config_info["documentation_summary"] = config_info["documentation_summary"]
        else:
            validated_config_info["documentation_summary"] = ""
            
        if "documentation_files" in config_info and isinstance(config_info["documentation_files"], list):
            validated_indices = []
            for idx_entry in config_info["documentation_files"]:
                try:
                    if isinstance(idx_entry, int):
                        idx = idx_entry
                    elif isinstance(idx_entry, str) and "#" in idx_entry:
                        idx = int(idx_entry.split("#")[0].strip())
                    else:
                        idx = int(str(idx_entry).strip())

                    if not (0 <= idx < file_count):
                        raise ValueError(
                            f"Invalid file index {idx} found. Max index is {file_count - 1}."
                        )
                    validated_indices.append(idx)
                except (ValueError, TypeError):
                    raise ValueError(
                        f"Could not parse index from entry: {idx_entry}"
                    )
            validated_config_info["documentation_files"] = validated_indices
        else:
            validated_config_info["documentation_files"] = []


        print(f"Extracted config information.")
        return validated_config_info

    def post(self, shared, prep_res, exec_res):
        shared["config_info"] = exec_res


class GenerateConfig(Node):
    def prep(self, shared):
        config_info = shared["config_info"]
        project_name = shared["project_name"]
        return config_info, project_name

    def exec(self, prep_res):
        config_info, project_name = prep_res
        print(f"Generating config for {project_name}...")
        # Placeholder for config generation logic
        generated_config = f"# Configuration for {project_name}\n\n"
        generated_config += f"# Summary from LLM:\n# {config_info.get('summary', 'N/A').replace('\n', '\n# ')}\n\n"
        
        for conf_file in config_info.get('configuration_files', []):
            generated_config += f"# Found config file: {conf_file.get('file_path', 'N/A')}\n"
            generated_config += f"# Description: {conf_file.get('description', 'N/A')}\n\n"

        return generated_config

    def post(self, shared, prep_res, exec_res):
        shared["generated_config"] = exec_res

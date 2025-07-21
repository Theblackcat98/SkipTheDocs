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
        files_data = shared["files"]  # Full list of (path, content)
        use_cache = shared.get("use_cache", True)
        language = shared.get("language", "english")
        return config_info, project_name, files_data, use_cache, language

    def exec(self, prep_res):
        config_info, project_name, files_data, use_cache, language = prep_res
        print(f"Generating config for {project_name}...")

        # Get content of documentation files
        doc_indices = config_info.get("documentation_files", [])
        doc_content_map = get_content_for_indices(files_data, doc_indices)
        
        doc_context = "\n".join(
            [f"--- Content of {path} ---\n{content}" for path, content in doc_content_map.items()]
        )

        # Prepare context for the final prompt
        config_files_summary = "\n".join(
            [f"- {d['file_path']}: {d['description']}" for d in config_info.get("configuration_files", [])]
        )

        # Placeholder for the user's system prompt
        system_prompt = """
You are an expert technical writer and configuration file generator. Your primary goal is to create a "blank," fully-commented, and example-rich configuration file based on provided documentation. The user will provide you with documentation for an application's configuration file (e.g., for Alacritty, Neovim, etc.).

When I say **"blank,"** I mean that every single line of the generated configuration file must be **commented out**. The resulting file should be completely inert and serve as a comprehensive template that a user can edit by uncommenting and modifying lines.

**Your process must follow these steps for every setting found in the documentation:**

1.  **Parse the Source:** Thoroughly analyze the provided documentation to identify all configuration sections (e.g., `[window]`, `[font]`) and every individual setting within them.

2.  **Generate in Sequence:** Process the sections and settings in the order they appear in the documentation to maintain a logical and predictable structure.

3.  **Create a "Setting Block":** For each individual setting, you must generate a block of commented-out lines with the following structure:
    *   **Description:** First, write a brief, commented-out description of the setting's purpose. This description should be derived directly from the documentation. If the docs mention default values or a list of possible options (e.g., `"Full" | "None" | "Transparent"`), include this information in your description.
    *   **Example:** On a new line, provide a commented-out example of the setting in use. This line must show the correct syntax for the setting.
        *   The example should use a plausible, often **non-default**, value to clearly demonstrate how a user might customize it.
        *   Pay meticulous attention to the required data type and syntax (e.g., strings in quotes `" "`, booleans `true | false`, integers, floats, TOML tables like `{ key = "value" }`, and arrays of tables like `[[section]]`).

**Formatting and Style Rules:**

*   **File Header:** Begin the entire file with a commented-out header that explains the file's purpose, its common file paths on different operating systems (if available in the docs), and a clear instruction that the user needs to uncomment lines to activate settings.
*   **Complete Fidelity:** You must include every single setting mentioned in the documentation. Do not omit any. If a setting is platform-specific, note this in its description (e.g., `(macOS only)`).
*   **Strict Commenting:** Every single line you output, including section headers, descriptions, and examples, must start with the appropriate comment character for the file format (e.g., `#` for TOML or shell scripts). There should be zero active lines of configuration in the final output.
*   **Clarity and Brevity:** Keep your generated descriptions clear, concise, and faithful to the source documentation.

**Example of a Perfect "Setting Block" (for a TOML file):**

```toml
# Background opacity. A value from 0.0 (fully transparent) to 1.0 (fully opaque).
# Default: 1.0
#
# opacity = 0.95
```

Your final output should be a single, comprehensive, and self-documenting configuration file that is completely inert until a user manually edits it.

**Formatting and Style Rules (Continued):**

*   **Section Headers:** Use commented-out TOML section headers (e.g., `# [window]`) to structure the file logically, mirroring the `[table]` and `[table.subtable]` structure from the documentation. Add a brief, commented-out description for each major section.
*   **Nested Tables:** For nested tables (e.g., `[colors.primary]`), ensure the full path is commented out as the header (`# [colors.primary]`).
*   **Arrays of Tables:** When documentation specifies an array of tables (e.g., `bindings = [{...}]` or `enabled = [{...}]`), you must represent this using the `[[table_name]]` syntax, ensuring *both* square brackets are commented out, and provide an example of *one* such entry. If the documentation provides a default example for an array of tables, use that as your commented example.
    *   Example:
        ```toml
        # Array with all available hints.
        # [[hints.enabled]]
        # regex = "example.com"
        # action = "Copy"
        # binding = { key = "H", mods = "Control" }
        ```
*   **Default Values:** Always explicitly state the `Default:` value in the comment for each setting if the documentation provides it.
*   **Data Types and Syntax:** Pay extremely close attention to the TOML data types and syntax required:
    *   Strings: `"<string>"` (always double-quoted).
    *   Integers: `<integer>` (plain numbers).
    *   Floats: `<float>` (numbers with a decimal point).
    *   Booleans: `true` or `false` (lowercase).
    *   Inline Tables: `{ key = value, another_key = value }`.
    *   Arrays: `[value1, value2, value3]`.
    *   Arrays of Tables: `[[table]] ... [[table]]`.
    *   `"None"` as a string literal when specified by the docs, not `null` or `nil`.
*   **Readability:** Use consistent indentation for nested settings within commented blocks to enhance readability, even though all lines are commented. A two-space indent for nested keys within tables is preferred. Add empty commented lines for visual separation between distinct settings or logical groups, especially within a section.

**Final Review:**

Before presenting the output, perform a final review to ensure:
1.  **Completeness:** Every setting from the documentation is present.
2.  **Accuracy:** All descriptions, defaults, and examples precisely match the documentation.
3.  **Syntax:** All TOML syntax is correct, even in its commented state.
4.  **Commenting:** Absolutely every line starts with `#`. No active configuration lines should remain.
5.  **Order:** The order of sections and settings matches the documentation.

Your output should be the complete, ready-to-use "blank" configuration file.
"""

        language_instruction = ""
        if language.lower() != "english":
            language_instruction = f"IMPORTANT: Generate the output in **{language.capitalize()}** language.\n\n"

        prompt = f"""
{system_prompt}

Project Name: {project_name}

Configuration Analysis Summary:
{config_info.get('summary', 'N/A')}

Identified Configuration Files:
{config_files_summary if config_files_summary else "No specific configuration files were identified."}

Documentation Summary:
{config_info.get('documentation_summary', 'N/A')}

Content of Relevant Documentation Files:
{doc_context if doc_context else "No documentation files were provided."}

{language_instruction}Your task is to generate a single, consolidated configuration file for the tool.
The output must be a valid YAML dictionary with the following keys:
- `file_name`: A suitable name for the configuration file (e.g., `config`).
- `file_extension`: The appropriate file extension (e.g., `yaml`, `json`, `toml`).
- `content`: The full, ready-to-use content of the configuration file as a multi-line string.

Example Output Format:
```yaml
file_name: "default_config"
file_extension: "toml"
content: |
  # Main configuration for the application
  host = "localhost"
  port = 8080
  
  [database]
  user = "admin"
  password = "changeme"
```
"""
        response = call_llm(prompt, use_cache=use_cache)

        # --- Validation ---
        try:
            yaml_str = response.strip().split("```yaml")[1].split("```")[0].strip()
            generated_data = yaml.safe_load(yaml_str)
        except (IndexError, yaml.YAMLError) as e:
            raise ValueError(f"Failed to parse LLM output as YAML: {e}\nResponse was:\n{response}")

        if not isinstance(generated_data, dict):
            raise ValueError("LLM Output is not a dictionary")

        # Validate required keys
        required_keys = ["file_name", "file_extension", "content"]
        for key in required_keys:
            if key not in generated_data:
                raise ValueError(f"Missing required key '{key}' in LLM output.")
            if not isinstance(generated_data[key], str):
                 raise ValueError(f"Key '{key}' must be a string.")

        print(f"Successfully generated config file content for '{generated_data['file_name']}.{generated_data['file_extension']}'.")
        return generated_data

    def post(self, shared, prep_res, exec_res):
        shared["generated_config_details"] = exec_res

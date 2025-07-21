import os
import yaml
import re
from datetime import datetime

def parse_frontmatter_and_content(file_path):
    """
    Parses YAML frontmatter and content from a file.
    Returns a tuple: (frontmatter_dict, content_string).
    """
    try:
        with open(file_path, 'r') as f:
            lines = f.readlines()
        
        if lines and lines[0].strip() == '---':
            frontmatter_lines = []
            content_start_index = -1
            for i, line in enumerate(lines[1:]):
                if line.strip() == '---':
                    content_start_index = i + 2
                    break
                frontmatter_lines.append(line)
            
            if content_start_index != -1:
                frontmatter_str = "".join(frontmatter_lines)
                content_str = "".join(lines[content_start_index:])
                return yaml.safe_load(frontmatter_str) or {}, content_str
    except Exception as e:
        print(f"Error parsing frontmatter from '{file_path}': {e}")
    
    # If no frontmatter, return empty dict and full content
    with open(file_path, 'r') as f:
        return {}, f.read()

def validate_and_enrich():
    """
    Walks through the 'data/configs' directory, validates frontmatter for each file,
    and enriches it with missing fields.
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, '..', '..', '..'))
    configs_dir = os.path.join(project_root, "data", "configs")

    for root, dirs, files in os.walk(configs_dir, topdown=True):
        # Exclude symlinks and special directories
        dirs[:] = [d for d in dirs if not os.path.islink(os.path.join(root, d))]
        
        for file in files:
            if file == 'configs_db.json':
                continue

            file_path = os.path.join(root, file)
            
            # Extract info from path, e.g., .../data/configs/alacritty/1.0.0/config.toml
            path_parts = file_path.split(os.sep)
            tool_name_from_path = path_parts[-3] if len(path_parts) > 2 else ""
            version_from_path = path_parts[-2] if len(path_parts) > 2 else ""

            existing_frontmatter, content = parse_frontmatter_and_content(file_path)

            # Define the complete set of fields with defaults
            default_frontmatter = {
                "displayName": "",
                "toolName": tool_name_from_path,
                "author": "",
                "description": "",
                "tags": [],
                "version": version_from_path,
                "repositoryUrl": "",
                "relatedConfigs": "",
                "lastModified": ""
            }

            # Merge existing data over the defaults
            new_frontmatter = {**default_frontmatter, **existing_frontmatter}

            # Enrich missing fields
            if not new_frontmatter.get("displayName"):
                new_frontmatter["displayName"] = new_frontmatter.get("toolName", "").capitalize()
            
            # Always update lastModified timestamp
            new_frontmatter["lastModified"] = datetime.utcnow().isoformat() + "Z"

            # Write the file back
            frontmatter_yaml = yaml.dump(new_frontmatter, sort_keys=False, allow_unicode=True)
            new_file_content = f"---\n{frontmatter_yaml}---\n{content}"

            with open(file_path, 'w') as f:
                f.write(new_file_content)
            
            print(f"Validated and enriched: {file_path}")

if __name__ == "__main__":
    # Note: This script requires PyYAML. Install it with: pip install pyyaml
    validate_and_enrich()
    print("\nValidation and enrichment complete.")
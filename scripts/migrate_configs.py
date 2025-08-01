import os
import shutil
import re
import yaml
from datetime import datetime

def find_project_root(start_path):
    """
    Finds the project root by searching upwards for a '.git' directory.
    """
    path = os.path.abspath(start_path)
    while True:
        if os.path.isdir(os.path.join(path, '.git')):
            return path
        parent_path = os.path.dirname(path)
        if parent_path == path:
            raise FileNotFoundError("Could not find project root (.git directory).")
        path = parent_path

def migrate_configs():
    """
    Migrates configuration files from the flat 'data/configs' directory to a new
    structured format: 'configs/<tool_name>/<version>/'.
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        project_root = find_project_root(script_dir)
    except FileNotFoundError as e:
        print(e)
        return

    # The original configs directory is the source
    source_dir = os.path.join(project_root, "data", "configs")
    # The new structure will be created within this same directory
    target_base_dir = source_dir
    version = "1.0.0"

    if not os.path.isdir(source_dir):
        print(f"Error: The source directory '{source_dir}' does not exist.")
        return

    os.makedirs(target_base_dir, exist_ok=True)

    processed_tools = set()

    for filename in os.listdir(source_dir):
        if os.path.isfile(os.path.join(source_dir, filename)):
            # Extract tool name based on the defined logic
            # (string before the first hyphen or dot)
            match = re.match(r"^([a-zA-Z0-9]+)", filename)
            if not match:
                print(f"Could not determine tool name for '{filename}'. Skipping.")
                continue
            
            tool_name = match.group(1)

            # Create the new directory structure
            new_dir = os.path.join(target_base_dir, tool_name, version)
            os.makedirs(new_dir, exist_ok=True)

            source_path = os.path.join(source_dir, filename)
            destination_path = os.path.join(new_dir, filename)

            # Generate frontmatter
            frontmatter = {
                "displayName": tool_name.capitalize(),
                "toolName": tool_name,
                "author": "",
                "description": f"A configuration for {tool_name.capitalize()}.",
                "tags": [],
                "version": version,
                "repositoryUrl": "",
                "relatedConfigs": "",
                "lastModified": datetime.utcnow().isoformat() + "Z",
            }
            
            frontmatter_yaml = yaml.dump(frontmatter, sort_keys=False)
            
            with open(source_path, 'r') as f:
                original_content = f.read()
            
            # Check if frontmatter already exists
            if original_content.startswith("---"):
                print(f"'{filename}' already has frontmatter. Moving without modification.")
                shutil.move(source_path, destination_path)
            else:
                new_content = f"---\n{frontmatter_yaml}---\n{original_content}"

                with open(destination_path, 'w') as f:
                    f.write(new_content)

                print(f"Migrating and adding frontmatter to '{source_path}' -> '{destination_path}'")
                os.remove(source_path)
            
            processed_tools.add(tool_name)

    # Create the 'latest' symlinks
    for tool_name in processed_tools:
        tool_dir = os.path.join(target_base_dir, tool_name)
        latest_link = os.path.join(tool_dir, "latest")
        version_dir = os.path.join(tool_dir, version)

        if not os.path.exists(latest_link):
            os.symlink(version_dir, latest_link)
            print(f"Creating symlink for {tool_name}: 'latest' -> '{version_dir}'")


if __name__ == "__main__":
    # Note: This script requires PyYAML. Install it with: pip install pyyaml
    migrate_configs()
    print("\nConfiguration migration complete.")
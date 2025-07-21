import os
import yaml
import json

def parse_frontmatter(file_path):
    """
    Parses YAML frontmatter from a file.
    Returns the parsed data as a dictionary, or None if no frontmatter is found.
    """
    try:
        with open(file_path, 'r') as f:
            lines = f.readlines()
        
        if lines and lines[0].strip() == '---':
            frontmatter_lines = []
            end_index = -1
            for i, line in enumerate(lines[1:]):
                if line.strip() == '---':
                    end_index = i + 1
                    break
                frontmatter_lines.append(line)
            
            if end_index != -1:
                frontmatter_str = "".join(frontmatter_lines)
                return yaml.safe_load(frontmatter_str)
    except Exception as e:
        print(f"Error parsing frontmatter from '{file_path}': {e}")
    return None

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

def build_database():
    """
    Walks through the 'configs' directory, parses frontmatter from each file,
    and builds a JSON database.
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        project_root = find_project_root(script_dir)
    except FileNotFoundError as e:
        print(e)
        return

    configs_dir = os.path.join(project_root, "data", "configs")
    database = []

    if not os.path.isdir(configs_dir):
        print(f"Error: The 'configs' directory was not found at '{configs_dir}'.")
        print("Please run the migration script first.")
        return

    for root, dirs, files in os.walk(configs_dir):
        # Ignore the 'latest' symlinks to avoid processing duplicates
        if 'latest' in dirs:
            dirs.remove('latest')

        for file in files:
            # Skip the database file itself
            if file == 'configs_db.json':
                continue

            file_path = os.path.join(root, file)
            
            # Explicitly skip symbolic links to avoid errors
            if os.path.islink(file_path):
                continue
                
            frontmatter = parse_frontmatter(file_path)
            
            if frontmatter:
                # Add the file path for reference
                frontmatter['filePath'] = file_path
                database.append(frontmatter)

    output_path = os.path.join(configs_dir, "configs_db.json")
    with open(output_path, 'w') as f:
        json.dump(database, f, indent=2)
    
    print(f"Successfully built config database at '{output_path}' with {len(database)} entries.")

if __name__ == "__main__":
    # Note: This script requires PyYAML. Install it with: pip install pyyaml
    build_database()
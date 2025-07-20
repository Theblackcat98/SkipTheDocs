import os
import argparse
from flow import extract_config_flow

# Default file patterns
DEFAULT_INCLUDE_PATTERNS = {
    "docs/*", "*.md", "*.txt", "*.yaml", "*.yml", "*.toml", "*.html", "metadata.json"
}

DEFAULT_EXCLUDE_PATTERNS = {
    "assets/*", "data/*", "images/*", "public/*", "static/*", "temp/*",
    "*venv/*",
    "*.venv/*",
    "*test*",
    "*tests/*",
    "v1/*",
    "*dist/*",
    "*build/*",
    "*experimental/*",
    "*deprecated/*",
    "*misc/*",
    "*legacy/*",
    ".git/*", ".github/*", ".next/*", ".vscode/*",
    "*obj/*",
    "*bin/*",
    "*node_modules/*",
    "*.log"
}

# --- Main Function ---
def main():
    parser = argparse.ArgumentParser(description="Generates a config file from a GitHub codebase that hosts a tool.")

    # Create mutually exclusive group for source
    source_group = parser.add_mutually_exclusive_group(required=True)
    source_group.add_argument("--repo", help="URL of the public GitHub repository.")
    source_group.add_argument("--dir", help="Path to local directory.")

    parser.add_argument("-n", "--name", help="Project name (optional, derived from repo/directory if omitted).")
    parser.add_argument("-t", "--token", help="GitHub personal access token (optional, reads from GITHUB_TOKEN env var if not provided).")
    parser.add_argument("-o", "--output", default="output", help="Base directory for output (default: ./output).")
    parser.add_argument("-i", "--include", nargs="+", help="Include file patterns (e.g. '*.py' '*.js'). Defaults to common code files if not specified.")
    parser.add_argument("-e", "--exclude", nargs="+", help="Exclude file patterns (e.g. 'tests/*' 'docs/*'). Defaults to test/build directories if not specified.")
    parser.add_argument("-s", "--max-size", type=int, default=100000, help="Maximum file size in bytes (default: 100000, about 100KB).")


    args = parser.parse_args()

    # Get GitHub token from argument or environment variable if using repo
    github_token = None
    if args.repo:
        github_token = args.token or os.environ.get('GITHUB_TOKEN')
        if not github_token:
            print("Warning: No GitHub token provided. You might hit rate limits for public repositories.")

    # Initialize the shared dictionary with inputs
    shared = {
        "repo_url": args.repo,
        "local_dir": args.dir,
        "project_name": args.name, # Can be None, FetchRepo will derive it
        "github_token": github_token,
        "output_dir": args.output, # Base directory for CombineTutorial output

        # Add include/exclude patterns and max file size
        "include_patterns": set(args.include) if args.include else DEFAULT_INCLUDE_PATTERNS,
        "exclude_patterns": set(args.exclude) if args.exclude else DEFAULT_EXCLUDE_PATTERNS,
        "max_file_size": args.max_size,

        # Add use_cache flag (inverse of no-cache flag)
        "use_cache": not args.no_cache,

        # Outputs will be populated by the nodes
        "files": [],
        "final_output_dir": None
    }

    # Display starting message with repository/directory and language
    print(f"Starting config scraping for: {args.repo or args.dir} in {args.language.capitalize()} language")
    print(f"LLM caching: {'Disabled' if args.no_cache else 'Enabled'}")

    # Create the flow instance
    tutorial_flow = extract_config_flow()

    # Run the flow
    tutorial_flow.run(shared)

if __name__ == "__main__":
    main()


if __name__ == "__main__":
    # --- Configuration ---
    # Define the repository and patterns to use for the test run
    repo_url = "https://github.com/pydantic/pydantic/tree/6c38dc93f40a47f4d1350adca9ec0d72502e223f/pydantic"
    include_patterns = {"*.py", "*.md"}
    exclude_patterns = {"**/test*.py"}
    max_file_size = 1 * 1024 * 1024  # 1 MB

    # --- Shared State ---
    # This dictionary simulates the initial state passed to the flow
    shared_initial = {
        "repo_url": repo_url,
        "local_dir": None,  # Not used when repo_url is provided
        "github_token": os.environ.get("GITHUB_TOKEN"),
        "include_patterns": include_patterns,
        "exclude_patterns": exclude_patterns,
        "max_file_size": max_file_size,
        "use_cache": True,  # Enable caching for LLM calls
    }

    # --- Flow Execution ---
    # Create and run the flow
    config_flow = extract_config_flow()
    final_shared_state = config_flow.run(shared_initial)

    # --- Output ---
    # Print the final generated configuration
    if final_shared_state and "generated_config" in final_shared_state:
        print("\n--- Generated Configuration ---")
        print(final_shared_state["generated_config"])
    else:
        print("\n--- Flow finished, but no configuration was generated ---")

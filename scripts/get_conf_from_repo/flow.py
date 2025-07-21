from pocketflow import Flow
# Import all node classes from nodes.py
from nodes import (
    FetchRepo,
    ExtractConfigInfo,
    GenerateConfig,
)

def extract_config_flow():
    """Creates and returns the codebase config extraction flow."""

    # Instantiate nodes
    fetch_repo = FetchRepo()
    extract_config_info = ExtractConfigInfo(max_retries=5, wait=20)
    generate_config = GenerateConfig()

    # Connect nodes in sequence
    fetch_repo >> extract_config_info
    extract_config_info >> generate_config

    # Create the flow
    config_flow = Flow(start=fetch_repo)

    return config_flow
# Configuration Management Strategy

This document outlines a strategy to improve the organization, sorting, and filtering of system configurations.

## 1. Unified Configuration Structure

To address the challenge of disparate configuration files, we propose a hierarchical structure that groups configurations by tool or service.

### 1.1. Directory Structure

All configurations will be stored in their own directory under the original `configs` directory with the following structure:

```
configs/
├── `configs_db.json`
├── <tool_or_service_name>/
│   ├── <version>/
│   │   └── config.*
│   │
│   ├── ...
│   └── latest -> <latest_version>/
├── ...
```

- **`<tool_or_service_name>`**: A unique identifier for the tool or service (e.g., `nginx`, `postgresql`).
- **`<version>`**: The version of the configuration (e.g., `1.0.0`, `2.1.3`). This allows for versioning and rollbacks.
- **`config.*`**: The actual configuration with the already present but improved yaml frontmatter.
- **`latest`**: A symbolic link to the latest version of the configuration.

### 1.2. Improved Frontmatter

The frontmatter will now contain metadata that makes the configuration trackable and manageable.

```yaml

---
displayName: "Alacritty" // displayed name on SkipTheDocs
toolName: "alacritty" // the executable name
author: "alacritty"
description: "A cross-platform, OpenGL terminal emulator."
tags: [terminal, emulator, gpu]
version: "1.0.0" //version the config is written for
repositoryUrl: "https://github.com/alacritty/alacritty"
relatedConfigs: "data/configs/alacritty/1.0.0/alacritty-theme.toml" // A list of paths to related configurations, establishing explicit links.
lastModified: "2025-07-21T07:05:43.750Z"
---

```

## 2. Metadata and Searchability

A robust metadata strategy is crucial for making configurations easy to find and understand. The `configs_db.json` file will be the single source that gets compiled at every change.

### 2.2. Search and Filtering API

A centralized service will be responsible for indexing the frontmater from all the files.
This service will expose an API with the following capabilities:

- **Full-text search:** Search across all frontmatter fields.
- **Filtering:** Filter configurations by `toolName`, `author`, `tags`, and other fields.
- **Graph traversal:** Explore relationships between configurations using the `relatedConfigs` field.

This API will power the UI/UX for configuration management.

## 3. UI/UX for Configuration Management

A user-friendly interface is essential for managing configurations effectively. The UI will be a web-based dashboard that provides a centralized view of all configurations.

### 3.1. Key Features

- **Dashboard:** A central dashboard with an overview of all configurations, including recent changes and alerts.
- **Search and Filtering:** A powerful search bar that leverages the metadata API to find configurations quickly.
- **Relationship Graph:** A visualization of the relationships between configurations, based on the `related_configs` field.
- **Versioning:** A dropdown in the modal view of the tool lists available versions for each configuration.

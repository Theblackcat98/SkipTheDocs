# Contributing to SkipTheDocs

Thank you for your interest in contributing to SkipTheDocs! We welcome all contributions, whether it's adding new configuration templates, improving existing ones, or enhancing the website.

## Table of Contents
- [Contributing to SkipTheDocs](#contributing-to-skipthedocs)
  - [Table of Contents](#table-of-contents)
  - [How to Contribute](#how-to-contribute)
    - [Reporting Issues](#reporting-issues)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Submitting Pull Requests](#submitting-pull-requests)
  - [Submitting a Config](#submitting-a-config)
  - [Updating a Config](#updating-a-config)
  - [Workflow Bots](#workflow-bots)
  - [Template Contribution Guidelines](#template-contribution-guidelines)
    - [Template Structure](#template-structure)
    - [Metadata Format](#metadata-format)
    - [Code Style](#code-style)
  - [Development Setup](#development-setup)
  - [Code of Conduct](#code-of-conduct)
  - [License](#license)

## How to Contribute

### Reporting Issues
If you find a bug or have a feature request, please [open an issue](https://github.com/yourusername/SkipTheDocs/issues). When reporting a bug, please include:

- A clear description of the issue
- Steps to reproduce the problem
- Expected vs. actual behavior
- Browser/OS version if relevant
- Any error messages

### Suggesting Enhancements
We welcome suggestions for new features or improvements. Please open an issue and:
- Describe the enhancement in detail
- Explain why it would be valuable
- Include any relevant examples or references

### Submitting Pull Requests
1. Fork the repository and create your branch from `main`
2. Make your changes
3. Ensure your code follows our style guidelines
4. Test your changes
5. Submit a pull request with a clear description of your changes

## Submitting a Config

To submit a Config, please follow these steps:

- Open an issue in [this template](.github/ISSUE_TEMPLATE/config-submission.md) with the title `[create-Config]: <Config-name>`
- Fill out the template with the necessary information
- Submit the issue
- Let us take care of the rest!

## Updating a Config

To update a Config, please follow these steps:

- Create a new pull request with the updated Config
- Make sure to include the Config name in the title
- Submit the pull request
- Let us take care of the rest!

> This applied to any other actions you want to take with the Configs in this repository.

## Workflow Bots

We make use of GitHub Actions to automate the workflow of the Configs in this repository. Here's how it works:

When creating a new Config, the bot will automatically create the files and folders needed for the Config to be added to the database. The bot will also close the issue and automatically create a pull request for the Config.

When updating a Config, the bot will automatically update the Config files and folders with the new changes. This will directly push the changes to the main branch.

## Template Contribution Guidelines

### Template Structure
Each configuration template should be placed in the appropriate directory under `public/configs/` based on the tool it's for (e.g., `neovim/`, `tmux/`, `zsh/`).

<!-- NOTE: I need to find a solution or schema to avoid config files all having the same name -->

### Metadata Format
Each template file should include YAML front matter with the following metadata:

```yaml
---
title: "Template Title"
description: "Brief description of what this configuration does"
author: "Your Name"
version: "1.0.0"
tags: ["tag1", "tag2"]
tool: "Tool Name"  # e.g., "Neovim", "tmux", "Zsh"
category: "development"  # e.g., "development", "productivity", "terminal"
---

# Your configuration code here
```

### Code Style
- Use consistent indentation (2 spaces)
- Include comments to explain non-obvious configurations
- Keep line lengths reasonable (80-100 characters)
- Remove any sensitive or personal information

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SkipTheDocs.git
   cd SkipTheDocs
   ```

2. Start a local development server:
   ```bash
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

3. Make your changes and test them locally.

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE) file.
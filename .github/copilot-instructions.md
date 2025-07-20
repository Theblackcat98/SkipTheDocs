# Copilot Instructions for SkipTheDocs

This guide enables AI coding agents to be immediately productive in the SkipTheDocs codebase. It covers architecture, workflows, conventions, and integration points unique to this project.

## Big Picture Architecture
- **Purpose:** SkipTheDocs is a static React/TypeScript web app for discovering and sharing configuration templates for command-line tools.
- **Main Data Flow:**
  - Config files are stored in `data/configs/`.
  - On startup, `App.tsx` loads all config files using Vite's `import.meta.glob` and parses YAML front matter with `gray-matter`.
  - Metadata (toolName, author, description, etc.) is extracted and used to populate the UI.
  - Users can search, filter, view, and download configs.
- **Key Components:**
  - `App.tsx`: Main state manager and orchestrator.
  - `components/`: Contains `Header`, `SearchBar`, `ConfigCard`, and `Modal` for UI composition.
  - `constants.tsx`: Defines popular tools and icons for filtering.

## Developer Workflows
- **Local Development:**
  - Start with `npm install` then `npm run dev` (Vite dev server).
  - Hot reload is enabled for React components and config files.
- **Build & Deploy:**
  - Build with `npm run build` (output in `dist/`).
  - Deploys via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages.
- **Adding Configurations:**
  - Place new config files in `data/configs/`.
  - Each config must have YAML front matter (see README for schema).
  - No need to update code for new configs; they are auto-discovered.

## Project-Specific Conventions
- **Config File Metadata:**
  - YAML front matter is required for all configs. Example:
    ```yaml
    ---
    toolName: "Name of the Tool"
    author: "Author's Name"
    description: "A brief description."
    version: "1.0.0"
    repositoryUrl: "https://github.com/user/repo"
    ---
    ```
- **Component Patterns:**
  - All UI logic is in React function components using hooks.
  - Modal and download logic are handled via callbacks in `App.tsx`.
- **Styling:**
  - Uses Tailwind CSS (`index.css`, `tailwind.config.js`).
  - No global CSS overrides; all styles are utility-based.
- **Type Safety:**
  - Types are defined in `types.ts` and imported throughout.

## Integration Points & Dependencies
- **Vite:** Handles dev server, build, and static asset loading.
- **gray-matter:** Parses YAML front matter from config files.
- **React & ReactDOM:** UI framework.
- **Tailwind CSS:** Utility-first styling.
- **GitHub Actions:** Automated deployment to GitHub Pages.

## Examples & References
- See `App.tsx` for config loading and state management.
- See `components/ConfigCard.tsx` for config display logic.
- See `constants.tsx` for tool filtering and icon usage.
- See `.github/workflows/deploy.yml` for CI/CD pipeline.

## Contribution & Testing
- Follow guidelines in `CONTRIBUTING.md`.
- No formal test suite; manual testing via local dev server.
- Pull requests should target `main` and include a clear description.

---
If any section is unclear or missing, please request clarification or provide feedback to improve these instructions.
import type { ConfigFile } from '../types';

export const DB_CONFIGS: ConfigFile[] = [
  {
    id: 'nvim-lua-kickstart',
    tool: 'Neovim',
    fileName: 'init.lua',
    description: 'A solid starting point for a modern Neovim configuration in Lua. Includes package management with lazy.nvim, LSP, autocompletion, and Telescope.',
    filePath: './configs/nvim-lua-kickstart.lua',
  },
  {
    id: 'tmux-basic-2024',
    tool: 'Tmux',
    fileName: '.tmux.conf',
    description: 'A clean and functional Tmux setup. Features a nice status bar, vi-style keybindings for pane navigation, and mouse support.',
    filePath: './configs/tmux-basic.conf',
  },
  {
    id: 'zsh-simple',
    tool: 'Zsh',
    fileName: '.zshrc',
    description: 'A minimal .zshrc file. Includes a simple git-aware prompt, common aliases, and history settings without needing a heavy framework like Oh My Zsh.',
    filePath: './configs/zsh-simple.zshrc',
  },
  {
    id: 'alacritty-tokyonight',
    tool: 'Alacritty',
    fileName: 'alacritty.toml',
    description: 'Tokyo Night theme for the Alacritty terminal emulator. A calm, dark theme that is easy on the eyes.',
    filePath: './configs/alacritty-tokyonight.toml',
  },
  {
    id: 'kitty-dracula',
    tool: 'Kitty',
    fileName: 'kitty.conf',
    description: 'The popular Dracula theme for the Kitty terminal. A dark theme with vibrant, consistent colors.',
    filePath: './configs/kitty-dracula.conf',
  },
  {
    id: 'fish-basic',
    tool: 'Fish',
    fileName: 'config.fish',
    description: 'A simple starting config for Fish shell. Includes theme settings, aliases, and enables some useful features.',
    filePath: './configs/fish-basic.fish',
  },
];

const n=`---
displayName: Alacritty
toolName: Alacritty
author: alacritty
description: A cross-platform, OpenGL terminal emulator.
tags: [terminal, gpu, shaders, rust]
version: 0.15.1
repositoryUrl: https://github.com/alacritty/alacritty
relatedConfigs: 'alacritty-theme.toml'
lastModified: '2025-07-21T09:10:44.640376Z'
---

# Alacritty TOML Configuration File
#
# This is a sample configuration file for Alacritty. It's fully commented
# and includes examples for every setting. To use a setting, you must
# uncomment it by removing the '#' at the beginning of the line.
#
# For more information, see the Alacritty documentation.
#
# Location:
#   - Unix:
#     - $XDG_CONFIG_HOME/alacritty/alacritty.toml
#     - $XDG_CONFIG_HOME/alacritty.toml
#     - $HOME/.config/alacritty/alacritty.toml
#     - $HOME/.alacritty.toml
#   - Windows:
#     - %APPDATA%\\alacritty\\alacritty.toml

# Import additional configuration files.
#
# Imports are loaded in order, with the current file being loaded last.
# Paths can be absolute, relative to the home directory (~), or relative
# to the current config file's directory.
#
# Example:
# import = [
#   "~/.config/alacritty/themes/catppuccin.toml",
#   "~/.config/alacritty/keybindings.toml",
# ]

# Environment variables to set for all processes spawned by Alacritty.
[env]
# Example: Set a specific scale factor for Wayland.
# WINIT_X11_SCALE_FACTOR = "1.0"

# [window] section contains settings related to the window appearance and behavior.
[window]

# Window dimensions (in character cells).
# If \`columns\` or \`lines\` is 0, the window manager's recommended size is used.
# Default: { columns = 0, lines = 0 }
#
# dimensions = { columns = 120, lines = 40 }

# Window startup position (in pixels).
# If set to "None", the window manager will decide the position.
# This has no effect on Wayland.
# Default: "None"
#
# position = { x = 100, y = 100 }

# Blank space added around the window in pixels. This padding is scaled by DPI.
# Default: { x = 0, y = 0 }
#
# padding = { x = 10, y = 10 }

# Spread additional padding evenly around the terminal content.
# Default: false
#
# dynamic_padding = true

# Window decorations.
# Options: "Full", "None", "Transparent" (macOS only), "Buttonless" (macOS only)
# Default: "Full"
#
# decorations = "Full"

# Background opacity. A value from 0.0 (fully transparent) to 1.0 (fully opaque).
# Default: 1.0
#
# opacity = 0.95

# Request compositor to blur content behind transparent windows.
# Works on macOS and KDE Wayland.
# Default: false
#
# blur = true

# Window startup mode.
# Options: "Windowed", "Maximized", "Fullscreen", "SimpleFullscreen" (macOS only)
# Default: "Windowed"
#
# startup_mode = "Windowed"

# Window title.
# Default: "Alacritty"
#
# title = "My Terminal"

# Allow terminal applications to change the window title.
# Default: true
#
# dynamic_title = true

# Window class (Linux/BSD only).
# On Wayland, \`general\` is used as \`app_id\`.
# Default: { instance = "Alacritty", general = "Alacritty" }
#
# [window.class]
# instance = "Alacritty"
# general = "Alacritty"

# Override the system's theme variant for window decorations.
# Options: "Dark", "Light", "None"
# Default: "None"
#
# decorations_theme_variant = "Dark"

# Prefer resizing the window by discrete steps equal to cell dimensions.
# Works on macOS and X11.
# Default: false
#
# resize_increments = true

# Make the Option key behave as Alt (macOS only).
# Options: "OnlyLeft", "OnlyRight", "Both", "None"
# Default: "None"
#
# option_as_alt = "OnlyLeft"

# Sets the window's z-order.
# Options: "Normal", "AlwaysOnTop"
# Default: "Normal"
#
# level = "Normal"


# [scrolling] section contains settings for the scrollback buffer.
[scrolling]

# Maximum number of lines in the scrollback buffer.
# A value of 0 will disable scrolling. Limited to 100000.
# Default: 10000
#
# history = 10000

# Number of lines scrolled for every input scroll increment.
# Default: 3
#
# multiplier = 3


# [font] section defines the fonts used by the terminal.
[font]

# Font size in points.
# Default: 11.25
#
# size = 12.0

# Normal font face.
# Default (Linux/BSD): { family = "monospace", style = "Regular" }
# Default (Windows):   { family = "Consolas", style = "Regular" }
# Default (macOS):     { family = "Menlo", style = "Regular" }
#
# [font.normal]
# family = "Fira Code"
# style = "Retina"

# Bold font face. Falls back to the normal font if family is not specified.
# Default: { style = "Bold" }
#
# [font.bold]
# family = "Fira Code"
# style = "Bold"

# Italic font face. Falls back to the normal font if family is not specified.
# Default: { style = "Italic" }
#
# [font.italic]
# family = "Fira Code"
# style = "Italic"

# Bold Italic font face. Falls back to the normal font if family is not specified.
# Default: { style = "Bold Italic" }
#
# [font.bold_italic]
# family = "Fira Code"
# style = "Bold Italic"

# Offset is the extra space around each character.
# \`y\` can be seen as line spacing, \`x\` as letter spacing.
# Default: { x = 0, y = 0 }
#
# offset = { x = 0, y = 2 }

# Glyph offset determines the location of glyphs within their cells.
# Increasing \`x\` moves the glyph right, increasing \`y\` moves it upward.
# Default: { x = 0, y = 0 }
#
# glyph_offset = { x = 0, y = 1 }

# Use a custom built-in font for box drawing, legacy, and powerline symbols.
# Default: true
#
# builtin_box_drawing = true


# [colors] section defines the color scheme of the terminal.
[colors]
# When true, bold text is drawn using the bright color variants.
# Default: false
#
# draw_bold_text_with_bright_colors = true

# When true, window.opacity applies to all cell backgrounds, not just the default.
# Default: false
#
# transparent_background_colors = false

# Primary colors
[colors.primary]
# background = "#2E3440"
# foreground = "#D8DEE9"

# Dim foreground color. If not set, it is calculated automatically.
# dim_foreground = "#A5ABB6"

# Bright foreground color. Only used when \`draw_bold_text_with_bright_colors\` is true.
# bright_foreground = "#ECEFF4"


# Cursor colors.
# \`text\` and \`cursor\` can be a hex color or 'CellBackground'/'CellForeground'.
# Default: { text = "CellBackground", cursor = "CellForeground" }
[colors.cursor]
# text = "CellBackground"
# cursor = "#81A1C1"

# Vi mode cursor colors.
# Default: { text = "CellBackground", cursor = "CellForeground" }
[colors.vi_mode_cursor]
# text = "CellBackground"
# cursor = "#B48EAD"


# Search colors.
[colors.search]
# \`matches\` are all search results.
# \`focused_match\` is the currently selected search result.
# Default matches:     { foreground = "#181818", background = "#ac4242" }
# Default focused_match: { foreground = "#181818", background = "#f4bf75" }
#
# [colors.search.matches]
# foreground = "#2E3440"
# background = "#88C0D0"
#
# [colors.search.focused_match]
# foreground = "#2E3440"
# background = "#A3BE8C"


# Hint colors (for URL hints, etc.).
[colors.hints]
# \`start\` is the first character in the hint label.
# \`end\` is all characters after the first one.
# Default start: { foreground = "#181818", background = "#f4bf75" }
# Default end:   { foreground = "#181818", background = "#ac4242" }
#
# [colors.hints.start]
# foreground = "#2E3440"
# background = "#EBCB8B"
#
# [colors.hints.end]
# foreground = "#2E3440"
# background = "#D8DEE9"


# Line indicator color (used in search and vi mode).
# Setting to "None" will use the opposing primary color.
# Default: { foreground = "None", background = "None" }
[colors.line_indicator]
# foreground = "None"
# background = "None"

# Footer bar color (used by search regex input, hyperlink URI preview).
# Default: { foreground = "#181818", background = "#d8d8d8" }
[colors.footer_bar]
# background = "#434C5E"
# foreground = "#D8DEE9"

# Selection colors.
# Default: { text = "CellBackground", background = "CellForeground" }
[colors.selection]
# text = "CellBackground"
# background = "#4C566A"

# Normal colors (colors 0-7)
[colors.normal]
# black =   "#3B4252"
# red =     "#BF616A"
# green =   "#A3BE8C"
# yellow =  "#EBCB8B"
# blue =    "#81A1C1"
# magenta = "#B48EAD"
# cyan =    "#88C0D0"
# white =   "#E5E9F0"

# Bright colors (colors 8-15)
[colors.bright]
# black =   "#4C566A"
# red =     "#BF616A"
# green =   "#A3BE8C"
# yellow =  "#EBCB8B"
# blue =    "#81A1C1"
# magenta = "#B48EAD"
# cyan =    "#8FBCBB"
# white =   "#ECEFF4"

# Dim colors. If not set, they are calculated automatically.
[colors.dim]
# black =   "#373e4d"
# red =     "#94545d"
# green =   "#809575"
# yellow =  "#b29e75"
# blue =    "#68809a"
# magenta = "#8c738c"
# cyan =    "#6d96a5"
# white =   "#aeb3bb"

# Indexed colors (from 16 to 256).
# Default: []
#
# indexed_colors = [
#   { index = 16, color = "#D08770" },
#   { index = 17, color = "#B48EAD" },
# ]


# [bell] section configures the terminal bell.
[bell]
# Visual bell animation effect.
# Options: "Ease", "EaseOut", "EaseOutSine", "EaseOutQuad", "EaseOutCubic",
#          "EaseOutQuart", "EaseOutQuint", "EaseOutExpo", "EaseOutCirc", "Linear"
# Default: "Linear"
#
# animation = "EaseOutExpo"

# Duration of the visual bell flash in milliseconds.
# A duration of 0 disables the visual bell.
# Default: 0
#
# duration = 500

# Visual bell animation color.
# Default: "#ffffff"
#
# color = "#ffffff"

# Command to execute when the bell is rung.
# Set to "None" to disable.
# Default: "None"
#
# command = { program = "canberra-gtk-play", args = ["-i", "bell"] }


# [selection] section configures text selection behavior.
[selection]
# Characters used as separators for "semantic words" (e.g., for Ctrl+Click).
# Default: ",│\`|:\\"' ()[]{}<>\\t"
#
# semantic_escape_chars = ",│\`|:\\"' ()[]{}<>\\t"

# When true, selected text is copied to the primary clipboard.
# Default: false
#
# save_to_clipboard = true


# [cursor] section configures the cursor's appearance.
[cursor]
# Cursor style. Can be a single value or a table.
# Shape options: "Block", "Underline", "Beam"
# Blinking options: "Never", "Off", "On", "Always"
# Default: { shape = "Block", blinking = "Off" }
#
# [cursor.style]
# shape = "Block"
# blinking = "On"

# Vi mode cursor style. If "None", falls back to the normal cursor style.
# Default: "None"
#
# [cursor.vi_mode_style]
# shape = "Underline"
# blinking = "On"

# Cursor blinking interval in milliseconds.
# Default: 750
#
# blink_interval = 750

# Time after which the cursor stops blinking, in seconds.
# A value of 0 disables this timeout.
# Default: 5
#
# blink_timeout = 5

# When true, the cursor is rendered as a hollow box when the window is unfocused.
# Default: true
#
# unfocused_hollow = true

# Thickness of the cursor, as a float from 0.0 to 1.0 of the cell width.
# Default: 0.15
#
# thickness = 0.15


# [terminal] section configures terminal-specific behavior.
[terminal]
# The shell program to execute.
# Can be a string or a table with \`program\` and \`args\`.
# Default (Linux/BSD/macOS): $SHELL or login shell
# Default (Windows): "powershell"
#
# shell = { program = "/bin/zsh", args = ["-l"] }

# Controls the ability to write to the system clipboard with OSC 52 escape sequence.
# Options: "Disabled", "OnlyCopy", "OnlyPaste", "CopyPaste"
# Default: "OnlyCopy"
#
# osc52 = "CopyPaste"


# [mouse] section configures mouse behavior.
[mouse]
# When true, the cursor is temporarily hidden when typing.
# Default: false
#
# hide_when_typing = true

# Mouse bindings.
#
# To define a binding, you need \`mouse\` and an \`action\`. \`mods\` is optional.
# \`mouse\`: "Middle", "Left", "Right", "Back", "Forward", or a number.
# \`mods\`: "Control|Shift|Alt|Super|Command|Option"
# \`action\`: See keyboard.bindings.action, plus "ExpandSelection".
#
# bindings = [
#   # Example: Right-click to paste selection (like in many other terminals).
#   { mouse = "Right", action = "PasteSelection" },
#
#   # Example: Ctrl + Right-click to paste from system clipboard.
#   { mouse = "Right", mods = "Control", action = "Paste" },
#
#   # Example: Middle-click to expand selection to the cursor position.
#   { mouse = "Middle", action = "ExpandSelection" },
# ]


# [hints] section allows you to define regex patterns to select and act on.
[hints]
# Keys used for hint labels.
# Default: "jfkdls;ahgurieowpq"
#
# alphabet = "jfkdls;ahgurieowpq"

# Array with all available hints. Each hint is a table.
#
# A hint must have:
# - \`regex\` OR \`hyperlinks = true\`
# - \`action\` OR \`command\`
#
# enabled = [
#   # Default URL hint (opens with xdg-open/open/start).
#   {
#     # Regex to match.
#     regex = "(ipfs:|ipns:|magnet:|mailto:|gemini://|gopher://|https://|http://|news:|file:|git://|ssh:|ftp://)[^\\u0000-\\u001F\\u007F-\\u009F<>\\"\\\\s{-}\\\\^⟨⟩\`\\\\\\\\]+",
#
#     # Also include OSC 8 hyperlinks.
#     hyperlinks = true,
#
#     # Command to execute. The matched text is passed as the last argument.
#     # command = "xdg-open", # Linux/BSD
#     # command = "open", # macOS
#     # command = { program = "cmd", args = [ "/c", "start", "" ] }, # Windows
#
#     # Post-processing to shorten the match (e.g., remove trailing '.').
#     post_processing = true,
#
#     # Keep hints persistent after selection.
#     persist = false,
#
#     # Action to perform. Options: "Copy", "Paste", "Select", "MoveViModeCursor".
#     # action = "Copy",
#
#     # Mouse configuration for this hint.
#     # \`enabled\` controls if the hint is underlined on hover.
#     mouse = { enabled = true, mods = "None" },
#
#     # Key binding to start the hint selection mode.
#     binding = { key = "O", mods = "Control|Shift" },
#   },
#
#   # Example: Highlight IP addresses and copy them to clipboard.
#   {
#     regex = "[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}",
#     action = "Copy",
#     binding = { key = "I", mods = "Control|Shift" },
#   }
# ]


# [keyboard] section defines all key bindings.
[keyboard]
# Key bindings are defined as an array of tables.
# To unset a default binding, use \`action = "None"\`.
#
# To find key names/codes, see:
# https://docs.rs/winit/latest/winit/keyboard/enum.NamedKey.html
# https://docs.rs/winit/latest/winit/keyboard/enum.Key.html#variant.Dead
#
# bindings = [
#   # Example: Create a new window with Ctrl+Shift+N.
#   { key = "N", mods = "Control|Shift", action = "CreateNewWindow" },
#
#   # Example: Write a literal 'l' character with Ctrl+Shift+L.
#   { key = "L", mods = "Control|Shift", chars = "l" },
#
#   # Example: Open a new terminal in the current directory with Ctrl+Shift+Enter.
#   { key = "Enter", mods = "Control|Shift", command = { program = "alacritty" } },
#
#   # Example: Unbind Ctrl+V to prevent pasting from the primary X11 selection.
#   # We can let the terminal handle it instead.
#   # { key = "V", mods = "Control", action = "None" },
#
#   # Example: Vi mode binding. Move to the beginning of the line with 'H' in Vi mode.
#   # \`mode = "Vi"\` requires Vi mode to be active. \`~Vi\` would mean not active.
#   { key = "H", mods = "Shift", mode = "Vi", action = "First" },
#
#   # Example: Custom macOS bindings for tabs.
#   # { key = "T", mods = "Command", action = "CreateNewTab" }, # macOS only
#   # { key = "Right", mods = "Command", action = "SelectNextTab" }, # macOS only
#   # { key = "Left", mods = "Command", action = "SelectPreviousTab" }, # macOS only
# ]


# [debug] section contains settings for troubleshooting Alacritty.
# These options are not stable and may be changed or removed.
[debug]

# Display the time it takes to draw each frame.
# Default: false
#
# render_timer = false

# Keep the log file after quitting Alacritty.
# Default: false
#
# persistent_logging = false

# Log level.
# Options: "Off", "Error", "Warn", "Info", "Debug", "Trace"
# Default: "Warn"
#
# log_level = "Warn"

# Force a specific renderer. "None" will use the best available.
# Options: "glsl3", "gles2", "gles2pure", "None"
# Default: "None"
#
# renderer = "None"

# Log all received window events.
# Default: false
#
# print_events = false

# Highlight window damage information.
# Default: false
#
# highlight_damage = false

# Use EGL as the display API if available. Transparency may not work on Linux/BSD.
# Default: false
#
# prefer_egl = false`;export{n as default};

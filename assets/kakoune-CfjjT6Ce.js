const n=`---
toolName: "kakoune.kak"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
# kakrc

# Theme
colorscheme default

# Tabs
set global tabstop 4
set global indentwidth 4
set global expandtab true

# Line numbers
set-option global line_numbers true

# Mouse support
set-option global mouse_support true

# UI
set-option global ui_options terminal_title,terminal_bell

# Hooks
hook global WinCreate .* %{
    set-option window static_line_numbers false
    set-option window line_numbers relative
}
`;export{n as default};

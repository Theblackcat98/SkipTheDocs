const n=`---
toolName: "fish-basic.fish"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
# config.fish - A simple starting config for Fish shell
# Includes theme settings, aliases, and enables some useful features

# Set greeting
set fish_greeting "Welcome to Fish shell! 🐟"

# Set default editor
set -gx EDITOR nano

# Set PATH additions
if test -d ~/.local/bin
    set -gx PATH ~/.local/bin $PATH
end

if test -d ~/bin
    set -gx PATH ~/bin $PATH
end

# Enable vi key bindings (optional - comment out if you prefer emacs bindings)
# fish_vi_key_bindings

# Set color scheme
set -g fish_color_normal normal
set -g fish_color_command 005fd7
set -g fish_color_quote 999900
set -g fish_color_redirection 00afff
set -g fish_color_end 009900
set -g fish_color_error ff0000
set -g fish_color_param 00afff
set -g fish_color_comment 990000
set -g fish_color_match --background=brblue
set -g fish_color_selection white --bold --background=brblack
set -g fish_color_search_match bryellow --background=brblack
set -g fish_color_history_current --bold
set -g fish_color_operator 00a6b2
set -g fish_color_escape 00a6b2
set -g fish_color_cwd green
set -g fish_color_cwd_root red
set -g fish_color_valid_path --underline
set -g fish_color_autosuggestion 585858
set -g fish_color_user brgreen
set -g fish_color_host normal
set -g fish_color_cancel -r
set -g fish_pager_color_completion normal
set -g fish_pager_color_description B3A06D yellow
set -g fish_pager_color_prefix white --bold --underline
set -g fish_pager_color_progress brwhite --background=cyan

# Aliases
alias ls='ls --color=auto'
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

# Directory navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# Git aliases
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline'
alias gd='git diff'
alias gb='git branch'
alias gco='git checkout'

# System aliases
alias df='df -h'
alias du='du -h'
alias free='free -h'
alias ps='ps aux'

# Safety aliases
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Quick edit
alias fishconfig='$EDITOR ~/.config/fish/config.fish'
alias reload='source ~/.config/fish/config.fish'

# Custom functions

# Function to create and enter directory
function mkcd
    mkdir -p $argv[1]
    cd $argv[1]
end

# Function to extract various archive formats
function extract
    if test -f $argv[1]
        switch $argv[1]
            case '*.tar.bz2'
                tar xjf $argv[1]
            case '*.tar.gz'
                tar xzf $argv[1]
            case '*.bz2'
                bunzip2 $argv[1]
            case '*.rar'
                unrar x $argv[1]
            case '*.gz'
                gunzip $argv[1]
            case '*.tar'
                tar xf $argv[1]
            case '*.tbz2'
                tar xjf $argv[1]
            case '*.tgz'
                tar xzf $argv[1]
            case '*.zip'
                unzip $argv[1]
            case '*.Z'
                uncompress $argv[1]
            case '*.7z'
                7z x $argv[1]
            case '*'
                echo "'$argv[1]' cannot be extracted via extract()"
        end
    else
        echo "'$argv[1]' is not a valid file"
    end
end

# Function to find files by name
function ff
    find . -name "*$argv[1]*" -type f
end

# Function to find directories by name
function fd
    find . -name "*$argv[1]*" -type d
end

# Function to show disk usage of current directory
function usage
    du -h --max-depth=1 | sort -hr
end

# Function to show weather (requires curl)
function weather
    if test (count $argv) -eq 0
        curl wttr.in
    else
        curl wttr.in/$argv[1]
    end
end

# Function to create a backup of a file
function backup
    cp $argv[1] $argv[1].bak
    echo "Backup created: $argv[1].bak"
end

# Function to show process tree
function pstree
    ps -eo pid,ppid,cmd --forest
end

# Function to show listening ports
function ports
    netstat -tuln
end

# Function to show system information
function sysinfo
    echo "System Information:"
    echo "=================="
    echo "Hostname: "(hostname)
    echo "Uptime: "(uptime)
    echo "Kernel: "(uname -r)
    echo "Architecture: "(uname -m)
    echo "CPU: "(grep "model name" /proc/cpuinfo | head -1 | cut -d: -f2 | string trim)
    echo "Memory: "(free -h | grep "Mem:" | awk '{print $3 "/" $2}')
    echo "Disk Usage: "(df -h / | tail -1 | awk '{print $3 "/" $2 " (" $5 ")"}')
end

# Enable fish's built-in web-based configuration
# Run 'fish_config' to open the web interface

# Auto-completion settings
set -g fish_complete_path $fish_complete_path ~/.config/fish/completions

# History settings
set -g fish_history_max_size 10000

# Enable syntax highlighting (built-in)
# Enable autosuggestions (built-in)

# Custom prompt (optional - fish has a good default)
# function fish_prompt
#     set_color $fish_color_cwd
#     echo -n (prompt_pwd)
#     set_color normal
#     echo -n ' $ '
# end

# Load local customizations if they exist
if test -f ~/.config/fish/local.fish
    source ~/.config/fish/local.fish
end

# Welcome message with system info
if status is-interactive
    echo "Fish shell loaded successfully! 🐟"
    echo "Type 'help' for help, 'fish_config' for web-based configuration"
end`;export{n as default};

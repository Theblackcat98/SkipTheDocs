---
toolName: "Zsh"
author: "sorin-ionescu"
description: "A minimal .zshrc file. Includes a simple git-aware prompt, common aliases, and history settings without needing a heavy framework like Oh My Zsh."
version: "1.0.0"
repositoryUrl: "https://github.com/sorin-ionescu/prezto"
---
# .zshrc - A minimal Zsh configuration
# Includes a simple git-aware prompt, common aliases, and history settings

# History settings
HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000
setopt SHARE_HISTORY
setopt APPEND_HISTORY
setopt INC_APPEND_HISTORY
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_ALL_DUPS
setopt HIST_REDUCE_BLANKS
setopt HIST_IGNORE_SPACE

# Completion settings
autoload -Uz compinit
compinit

# Case insensitive completion
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'

# Colored completion
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"

# Enable correction
setopt CORRECT

# Enable extended globbing
setopt EXTENDED_GLOB

# Disable beep
unsetopt BEEP

# Key bindings
bindkey -e  # Emacs key bindings
bindkey '^[[A' history-search-backward
bindkey '^[[B' history-search-forward

# Git-aware prompt function
git_prompt_info() {
    local branch
    if git rev-parse --git-dir > /dev/null 2>&1; then
        branch=$(git symbolic-ref --short HEAD 2>/dev/null || git rev-parse --short HEAD 2>/dev/null)
        if [[ -n $branch ]]; then
            local status=""
            if [[ -n $(git status --porcelain 2>/dev/null) ]]; then
                status=" %F{red}*%f"
            fi
            echo " %F{blue}(%F{green}$branch%F{blue})%f$status"
        fi
    fi
}

# Set prompt
setopt PROMPT_SUBST
PROMPT='%F{cyan}%n%f@%F{yellow}%m%f:%F{green}%~%f$(git_prompt_info) %# '

# Right prompt with time
RPROMPT='%F{gray}[%D{%H:%M:%S}]%f'

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
alias zshrc='${EDITOR:-nano} ~/.zshrc'
alias reload='source ~/.zshrc'

# Directory colors
if [[ -x /usr/bin/dircolors ]]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
fi

# Enable syntax highlighting if available
if [[ -f /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh ]]; then
    source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
fi

# Enable autosuggestions if available
if [[ -f /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh ]]; then
    source /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh
fi

# Load local customizations if they exist
if [[ -f ~/.zshrc.local ]]; then
    source ~/.zshrc.local
fi
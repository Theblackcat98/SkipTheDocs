const n=`---
displayName: Polybar.config
toolName: polybar.config
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.628274Z'
---
[colors]
background = #282A2E
background-alt = #373B41
foreground = #C5C8C6
primary = #81A2BE
secondary = #B294BB
alert = #CC6666
disabled = #707880

[bar/mybar]
width = 100%
height = 24pt
radius = 6

background = \${colors.background}
foreground = \${colors.foreground}

line-size = 3pt

border-size = 4pt
border-color = #00000000

padding-left = 0
padding-right = 1

module-margin = 1

separator = |
separator-foreground = \${colors.disabled}

font-0 = monospace;2

modules-left = i3
modules-center = date
modules-right = pulseaudio memory cpu

cursor-click = pointer
cursor-scroll = ns-resize

enable-ipc = true

[module/i3]
type = internal/i3
format = <label-state> <label-mode>
index-sort = true
wrapping-scroll = false

[module/date]
type = internal/date
interval = 1
date = %H:%M
date-alt = %Y-%m-%d %H:%M:%S
label = %date%
label-foreground = \${colors.primary}

[module/pulseaudio]
type = internal/pulseaudio
format-volume-prefix = "VOL "
format-volume-prefix-foreground = \${colors.primary}
format-volume = <label-volume>

[module/memory]
type = internal/memory
interval = 2
format-prefix = "RAM "
format-prefix-foreground = \${colors.primary}
label = %percentage_used%%

[module/cpu]
type = internal/cpu
interval = 2
format-prefix = "CPU "
format-prefix-foreground = \${colors.primary}
label = %percentage:2%%
`;export{n as default};

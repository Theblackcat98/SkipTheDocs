const n=`---
toolName: "alacritty.yml"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
# Configuration for Alacritty, the GPU-accelerated terminal emulator.
# Any items in the sample config file can be uncommented and modified.

# Font configuration
font:
  normal:
    family: monospace
    style: Regular
  bold:
    family: monospace
    style: Bold
  italic:
    family: monospace
    style: Italic
  size: 11.0

# Colors (Tomorrow Night)
colors:
  primary:
    background: '0x1d1f21'
    foreground: '0xc5c8c6'
  normal:
    black:   '0x1d1f21'
    red:     '0xcc6666'
    green:   '0xb5bd68'
    yellow:  '0xf0c674'
    blue:    '0x81a2be'
    magenta: '0xb294bb'
    cyan:    '0x8abeb7'
    white:   '0xc5c8c6'
`;export{n as default};

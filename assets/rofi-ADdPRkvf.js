const n=`---
displayName: Rofi.config
toolName: rofi.config
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.631199Z'
---
configuration {
    modi: "window,run,drun";
    font: "Monospace 12";
    show-icons: true;
    terminal: "alacritty";
    drun-display-format: "{name}";
    location: 0;
    disable-history: false;
    hide-scrollbar: true;
    display-drun: "Apps";
    display-run: "Run";
    display-window: "Windows";
    sidebar-mode: true;
}
@theme "gruvbox-dark"
`;export{n as default};

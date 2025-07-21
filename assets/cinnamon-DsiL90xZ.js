const n=`---
displayName: Cinnamon.dconf
toolName: cinnamon.dconf
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.607851Z'
---
[org/cinnamon/desktop/interface]
clock-use-24h=false
icon-theme='Mint-X'
gtk-theme='Mint-X'

[org/cinnamon]
enabled-applets=['panel1:left:0:menu@cinnamon.org:0', 'panel1:left:1:show-desktop@cinnamon.org:1', 'panel1:left:2:launcher@cinnamon.org:2', 'panel1:left:3:window-list@cinnamon.org:3', 'panel1:right:0:systray@cinnamon.org:4', 'panel1:right:1:power@cinnamon.org:5', 'panel1:right:2:calendar@cinnamon.org:6', 'panel1:right:3:sound@cinnamon.org:7', 'panel1:right:4:keyboard@cinnamon.org:8']
number-workspaces=4

[org/cinnamon/desktop/background]
picture-uri='file:///usr/share/backgrounds/linuxmint/sele_ring.jpg'
`;export{n as default};

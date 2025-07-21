const n=`---
displayName: Mplayer.conf
toolName: mplayer.conf
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.624008Z'
---
#
# MPlayer configuration file
#

#
# Video
#
vo=vdpau,
hwdec=vdpau

#
# Audio
#
ao=pulse

#
# Subtitles
#
subcp=enca:ru:utf8
subfont-text-scale=4

#
# OSD
#
osdlevel=3
osd-duration=5000

#
# General
#
stop-xscreensaver=yes
`;export{n as default};

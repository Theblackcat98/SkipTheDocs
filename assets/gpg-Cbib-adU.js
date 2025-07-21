const n=`---
displayName: Gpg.conf
toolName: gpg.conf
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.615709Z'
---
#
# GnuPG configuration file
#

#
# Key server
#
keyserver hkps://keys.openpgp.org

#
# Default key
#
default-key 0x1234567890ABCDEF

#
# Other options
#
use-agent
with-fingerprint
`;export{n as default};

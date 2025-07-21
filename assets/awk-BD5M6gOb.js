const n=`---
displayName: Awk.conf
toolName: awk.conf
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.606479Z'
---
# This is a dummy config file for awk. Awk is usually used directly from the command line.
# You can define functions in a file and use them with the -f option.
# For example:
# function my_print(s) {
#   print "My print: " s
# }
#
# And then run:
# awk -f awk.conf '{ my_print(-bash) }' file.txt
`;export{n as default};

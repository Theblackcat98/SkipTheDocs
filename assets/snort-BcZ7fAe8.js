const n=`---
toolName: "snort.conf"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
#
# Snort configuration file.
#

#
# Site-specific configuration
#
ipvar HOME_NET any
ipvar EXTERNAL_NET !

#
# Set the path to the rules files
#
var RULE_PATH ../rules
var SO_RULE_PATH ../so_rules
var PREPROC_RULE_PATH ../preproc_rules

#
# Port-specific configuration
#
portvar HTTP_PORTS 80
portvar SHELLCODE_PORTS !80
portvar ORACLE_PORTS 1521
portvar SSH_PORTS 22

#
# Configure the snort decoder
#
config daq: afpacket
config daq_dir: /usr/local/lib/snort_dynamicrules
config daq_mode: inline

#
# Configure the output plugins
#
output unified2: filename snort.u2, limit 128

#
# Include the rules files
#
include /local.rules
`;export{n as default};

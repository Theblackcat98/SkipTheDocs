const n=`---
displayName: Fluentd.conf
toolName: fluentd.conf
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.613454Z'
---
#
# Fluentd configuration file
#

#
# Input plugins
#
<source>
  @type forward
  port 24224
  bind 0.0.0.0
</source>

#
# Filter plugins
#
<filter docker.**>
  @type parser
  key_name log
  reserve_data true
  <parse>
    @type json
  </parse>
</filter>

#
# Output plugins
#
<match docker.**>
  @type elasticsearch
  host localhost
  port 9200
  logstash_format true
  logstash_prefix docker
  logstash_dateformat %Y%m%d
  include_tag_key true
  type_name docker
  tag_key @log_name
  flush_interval 1s
</match>
`;export{n as default};

const n=`---
displayName: Logstash.conf
toolName: logstash.conf
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.622602Z'
---
# Sample Logstash configuration for receiving logs from a file,
# parsing them, and sending them to Elasticsearch.

input {
  file {
    path => "/var/log/my-app.log"
    start_position => "beginning"
  }
}

filter {
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}" }
  }
  date {
    match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]
  }
  geoip {
    source => "clientip"
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "my-app-%{+YYYY.MM.dd}"
  }
}
`;export{n as default};

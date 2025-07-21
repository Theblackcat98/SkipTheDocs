---
displayName: Chef.client.rb
toolName: chef.client.rb
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.607508Z'
---
#
# Chef Client Config File
#
# A client.rb file is a Ruby file that is used to specify the configuration
# for the chef-client. This file is loaded by the chef-client every time it
# runs.
#
# For more information, see https://docs.chef.io/config_rb_client.html

log_level        :info
log_location     STDOUT
chef_server_url  'https://api.chef.io/organizations/my_org'
validation_client_name 'my_org-validator'
validation_key   '/etc/chef/validation.pem'
client_key       '/etc/chef/client.pem'

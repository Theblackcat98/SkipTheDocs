const n=`---
toolName: "grafana.ini"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
#
# Grafana configuration file
#
# You can also use environment variables to configure Grafana.
# The name of the variable should be in the format of GF_<SectionName>_<KeyName>.
# For example, for the server section and the http_port key, the variable would be GF_SERVER_HTTP_PORT.
#

#
# Server
#
[server]
# The http port to use
http_port = 3000

# The protocol to use (http or https)
protocol = http

# The domain name to use
domain = localhost

# The full URL to use for the Grafana instance.
# This is important for redirects and links.
root_url = %(protocol)s://%(domain)s:%(http_port)s/

#
# Database
#
[database]
# You can configure the database connection here.
# The type can be sqlite3, mysql, or postgres.
type = sqlite3
path = /var/lib/grafana/grafana.db

#
# Security
#
[security]
# The admin user
admin_user = admin

# The admin password
admin_password = admin
`;export{n as default};

const e=`---
displayName: Postgresql.conf
toolName: postgresql.conf
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.628959Z'
---
# -----------------------------
# PostgreSQL configuration file
# -----------------------------
#
# This file consists of lines of the form:
#
#   name = value
#
# (The "=" is optional.)  Whitespace may be used.  Comments are introduced with
# "#" anywhere on a line.  The complete list of parameter names and allowed
# values can be found in the PostgreSQL documentation.
#
# The commented-out settings shown in this file represent the default values.
# Re-commenting a setting is NOT sufficient to revert it to the default value;
# you need to reload the server.
#
# This file is read on server startup and when the server receives a SIGHUP
# signal.  If you edit the file on a running system, you have to SIGHUP the
# server for the changes to take effect, or use "pg_ctl reload".  Some
# parameters, which are marked below, require a server restart to take effect.
#
# Any parameter can also be given as a command-line option to the postmaster,
# e.g., "postmaster -c log_connections=on".  Some parameters can be changed
# for an individual session by the "SET" command.
#
# Memory units:  B  (bytes), kB (kilobytes), MB (megabytes), GB (gigabytes)
# Time units:    ms (milliseconds), s (seconds), min (minutes), h (hours), d (days)


#------------------------------------------------------------------------------
# FILE LOCATIONS
#------------------------------------------------------------------------------

# The default values of these variables are driven from the -D command-line
# option or PGDATA environment variable, represented here as ConfigDir.

data_directory = '/var/lib/postgresql/14/main'		# use data in another directory
hba_file = '/etc/postgresql/14/main/pg_hba.conf'	# host-based authentication file
ident_file = '/etc/postgresql/14/main/pg_ident.conf'	# ident configuration file

# If external_pid_file is not explicitly set, no extra PID file is written.
external_pid_file = '/var/run/postgresql/14-main.pid'			# write an extra PID file


#------------------------------------------------------------------------------
# CONNECTIONS AND AUTHENTICATION
#------------------------------------------------------------------------------

# - Connection Settings -

listen_addresses = 'localhost'		# what IP address(es) to listen on;
					# comma-separated list of addresses;
					# defaults to 'localhost'; use '*' for all
					# (change requires restart)
port = 5432				# (change requires restart)
max_connections = 100			# (change requires restart)
`;export{e as default};

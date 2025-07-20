const a=`#
# freshclam.conf
#

# Path to the database directory.
# WARNING: It must match clamd.conf's directive!
# Default: /var/lib/clamav
DatabaseDirectory /var/lib/clamav

# Path to the log file (make sure it has proper permissions).
# Default: /var/log/freshclam.log
UpdateLogFile /var/log/freshclam.log

# Maximum number of attempts to connect to the database servers.
# Default: 3 (per mirror)
#MaxAttempts 5

# How often to check for new database versions.
# Default: 24 (in hours)
#Checks 12

# The name of the database mirror to use.
# Default: database.clamav.net
#DatabaseMirror db.us.clamav.net
`;export{a as default};

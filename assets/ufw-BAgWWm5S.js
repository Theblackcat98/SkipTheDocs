const e=`# /etc/ufw/ufw.conf
#

# Set to yes to start on boot. If setting this remotely, be sure to add a rule
# to allow your remote connection before starting ufw. See .
ENABLED=yes

#
# Please use the 'ufw' command to set the loglevel.
# See 'man ufw' for details.
#
LOGLEVEL=low
`;export{e as default};

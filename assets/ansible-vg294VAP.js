const n=`---
displayName: Ansible.cfg
toolName: ansible.cfg
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.604837Z'
---
# config file for ansible -- http://ansible.com/
# ==============================================

# nearly all parameters can be overridden in ansible-playbook
# or with command line flags. ansible will read ANSIBLE_CONFIG,
# ansible.cfg in the current working directory, .ansible.cfg in
# the home directory or /etc/ansible/ansible.cfg, whichever it
# finds first

[defaults]

# some basic default values...

#inventory      = /etc/ansible/hosts
#library        = /usr/share/my_modules/
#module_utils   = /usr/share/my_module_utils/
#remote_tmp     = ~/.ansible/tmp
#local_tmp      = ~/.ansible/tmp
#plugin_filters_cfg = /etc/ansible/plugin_filters.yml
#forks          = 5
#poll_interval  = 15
#sudo_user      = root
#ask_sudo_pass = True
#ask_pass      = True
#transport      = smart
#remote_port    = 22
#module_lang    = C
#module_set_locale = False
#gathering = implicit
#gather_subset = all
#gather_timeout = 10
#roles_path    = /etc/ansible/roles
host_key_checking = False
#stdout_callback = skippy
#task_includes_static = yes
#handler_includes_static = yes
#display_skipped_hosts = True
#error_on_undefined_vars = True
#system_warnings = True
#deprecation_warnings = True
#command_warnings = False
#action_warnings = True
#nocows = 1

[privilege_escalation]
#become=True
#become_method=sudo
#become_user=root
#become_ask_pass=False
`;export{n as default};

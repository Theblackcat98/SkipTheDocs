const n=`---
displayName: Irssi.config
toolName: irssi.config
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.618261Z'
---
#
# Irssi configuration file
#

servers = (
  {
    address = "irc.libera.chat";
    port = "6697";
    use_ssl = "yes";
    ssl_verify = "yes";
    autoconnect = "yes";
  }
);

channels = (
  { name = "#irssi"; chatnet = "libera"; autojoin = "yes"; }
);

settings = {
  core = {
    real_name = "Your Name";
    user_name = "your_nick";
    nick = "your_nick";
  };
  "fe-common/core" = {
    autolog = "yes";
    log_path = "~/.irssi/logs/%Y/%m//-bash.log";
  };
};

aliases = {
  J = "join";
  W = "window";
  Q = "query";
  M = "msg";
  N = "names";
  S = "say";
  ME = "action";
};
`;export{n as default};

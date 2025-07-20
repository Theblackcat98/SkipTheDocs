const e=`---
toolName: "spamassassin.local.cf"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
# These values can be overridden by user preferences.
# See 'perldoc Mail::SpamAssassin::Conf' for details of what can be
# specified.
#
# required_score 5.0
# rewrite_header Subject *****SPAM*****
# report_safe 1
# use_bayes 1
# bayes_auto_learn 1
`;export{e as default};

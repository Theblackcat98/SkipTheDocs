const n=`---
displayName: Github-actions.main.workflow
toolName: github-actions.main.workflow
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.614716Z'
---
workflow "New workflow" {
  on = "push"
  resolves = ["Run tests"]
}

action "Install dependencies" {
  uses = "actions/npm@v2.0.0"
  args = "install"
}

action "Run tests" {
  uses = "actions/npm@v2.0.0"
  needs = ["Install dependencies"]
  args = "test"
}
`;export{n as default};

---
toolName: "github-actions.main.workflow"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
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

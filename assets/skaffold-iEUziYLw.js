const n=`---
displayName: Skaffold.yaml
toolName: skaffold.yaml
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.633306Z'
---
apiVersion: skaffold/v2beta29
kind: Config
metadata:
  name: my-app
build:
  artifacts:
  - image: my-app
    context: .
deploy:
  kubectl:
    manifests:
    - k8s-*
`;export{n as default};

const n=`---
toolName: "kubernetes.kubeconfig"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: "..."
    server: "https://..."
  name: "my-cluster"
contexts:
- context:
    cluster: "my-cluster"
    user: "my-user"
  name: "my-context"
current-context: "my-context"
kind: Config
preferences: {}
users:
- name: "my-user"
  user:
    client-certificate-data: "..."
    client-key-data: "..."
`;export{n as default};

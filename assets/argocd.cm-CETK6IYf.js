const n=`apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
  labels:
    app.kubernetes.io/name: argocd-cm
    app.kubernetes.io/part-of: argocd
data:
  # add an additional local user with login and apiKey capabilities
  accounts.admin: apiKey,login

  # disables user-creation for the admin user
  admin.enabled: "false"

  # specifies a list of whitelisted Kustomize versions
  kustomize.versions: |
    - v3.8.7
    - v4.0.5

  # URL for getting Kustomize builds
  kustomize.buildOptions: "--enable-helm"
`;export{n as default};

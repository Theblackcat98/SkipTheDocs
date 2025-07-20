const n=`apiVersion: skaffold/v2beta29
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

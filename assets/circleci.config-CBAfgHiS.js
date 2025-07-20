const n=`---
toolName: "circleci.config.yml"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
version: 2.1
orbs:
  node: circleci/node@4.7.0
jobs:
  build_and_test:
    docker:
      - image: cimg/node:14.17
    steps:
      - checkout
      - node/install-packages:
          pkg-manager: npm
      - run:
          name: Run tests
          command: npm test
workflows:
  my_workflow:
    jobs:
      - build_and_test
`;export{n as default};

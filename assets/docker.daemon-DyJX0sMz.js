const n=`---
toolName: "docker.daemon.json"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "features": {
    "buildkit": true
  }
}
`;export{n as default};

const n=`---
toolName: "inkscape.preferences.xml"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<inkscape
   version="1.1.2 (0a00cf5339, 2022-02-04)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape">
  <group
     id="options">
    <group
       id="rendering"
       label="Rendering">
      <group
         id="renderingcache"
         label="Rendering Cache"
         value="512000" />
    </group>
    <group
       id="autosave"
       label="Autosave"
       enable="1"
       interval="10"
       path=""
       max="10" />
  </group>
  <group
     id="tools">
    <group
       id="shapes"
       label="Shapes">
      <group
         id="rect"
         label="Rectangle"
         style="fill:#ff0000;stroke:#000000;stroke-width:1" />
      <group
         id="ellipse"
         label="Ellipse"
         style="fill:#00ff00;stroke:#000000;stroke-width:1" />
      <group
         id="star"
         label="Star"
         style="fill:#ffff00;stroke:#000000;stroke-width:1" />
      <group
         id="spiral"
         label="Spiral"
         style="fill:none;stroke:#0000ff;stroke-width:1" />
    </group>
  </group>
</inkscape>
`;export{n as default};

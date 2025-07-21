import React from 'react'; // Assuming you need this for _PopularTool_

// Update this interface to include all the fields we need.
export interface ConfigFile { // Renamed from _ConfigFile_ for standard convention, but you can keep your name.
  id: string;
  toolName: string;
  displayName: string;      // Added
  author: string;
  description: string;
  tags: string[];           // Added
  version: string;
  repositoryUrl: string;
  relatedConfigs: string[]; // Added
  lastModified?: string;    // Added (optional)
  fileName: string;
  filePath: string;
  content: string;          // This will be content *without* frontmatter
}

export type MetadataDb = {
  [toolName: string]: {
    displayName: string;
    author?: string;
    description?: string;
    repositoryUrl?: string;
  };
};

export interface ConfigData {
  title: string;
  description: string;
  author: string;
  version: string;
  tags: string[];
  tool: string;
  category: string;
  compatibility: {
    version_min: string;
    version_max: string;
    os: string[];
  };
  content: string;
}

export interface PopularTool {
  name: string;
  icon: React.ReactNode;
}
export interface ConfigFile {
  id: string;
  toolName: string;
  author: string;
  description: string;
  version: string;
  repositoryUrl: string;
  fileName: string;
  filePath: string;
  content: string;
}

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
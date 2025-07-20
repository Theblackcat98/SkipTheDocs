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

export interface PopularTool {
  name: string;
  icon: React.ReactNode;
}
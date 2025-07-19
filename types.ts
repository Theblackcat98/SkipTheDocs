export interface ConfigFile {
  id: string;
  tool: string;
  description: string;
  fileName: string;
  filePath: string;
  content?: string;
}

export interface PopularTool {
  name: string;
  icon: React.ReactNode;
}
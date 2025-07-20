import React from 'react';
import type { ConfigFile } from '../types.ts';
import { IconDownload } from '../constants.tsx';

interface ConfigCardProps {
  config: ConfigFile;
  onView: (config: ConfigFile) => void;
  onDownload: (config: ConfigFile) => void;
}

const ConfigCard: React.FC<ConfigCardProps> = ({ config, onView, onDownload }) => {
  const shortDescription = config.description.length > 100 ? config.description.substring(0, 97) + '...' : config.description;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10 flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-100">{config.toolName}</h3>
        <p className="text-sm text-indigo-400 font-mono mt-1">{config.fileName}</p>
        <p className="mt-4 text-gray-400 text-sm" title={config.description}>
          {shortDescription}
        </p>
      </div>
      <div className="p-4 bg-gray-800/80 border-t border-gray-700/50 flex items-center justify-end gap-2 flex-shrink-0">
        <button
          onClick={() => onView(config)}
          className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
        >
          View Full Config
        </button>
        <button
          onClick={() => onDownload(config)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
        >
          <IconDownload className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
};

export default ConfigCard;
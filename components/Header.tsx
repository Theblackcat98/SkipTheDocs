import React from 'react';
interface HeaderProps {
  onSubmitClick: () => void;
}
const Header: React.FC<HeaderProps> = ({ onSubmitClick }) => {
  return (
    <header className="sticky-header bg-gray-900 py-4 border-b border-gray-700/50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            SkipTheDocs
          </h1>
        </div>
        <button
          onClick={onSubmitClick}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Submit Config
        </button>
      </div>
    </header>
  );
};
export default Header;
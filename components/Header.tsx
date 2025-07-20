import React from 'react';

interface HeaderProps {
  onSubmitClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSubmitClick }) => {
  return (
    <header className="relative py-8 sm:py-12 border-b border-gray-700/50">
      <div className="absolute right-4 top-4">
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
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          SkipTheDocs
        </h1>
        <p className="mt-3 text-lg sm:text-xl max-w-2xl mx-auto text-gray-400">
          The ultimate database for your development tool configurations.
        </p>
      </div>
    </header>
  );
};

export default Header;
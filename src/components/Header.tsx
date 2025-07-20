import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 sm:py-12 border-b border-gray-700/50">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        SkipTheDocs
      </h1>
      <p className="mt-3 text-lg sm:text-xl max-w-2xl mx-auto text-gray-400">
        The ultimate database for your development tool configurations.
      </p>
    </header>
  );
};

export default Header;
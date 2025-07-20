import React from 'react';

interface SearchBarProps {
  filterTerm: string;
  setFilterTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ filterTerm, setFilterTerm }) => {
  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full p-2 shadow-lg focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          placeholder="Search for tools, filenames, or keywords..."
          className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none px-4 py-2"
        />
      </div>
    </div>
  );
};

export default SearchBar;
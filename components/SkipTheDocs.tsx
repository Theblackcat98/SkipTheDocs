import React from "react";

interface SkipTheDocsProps {
  onSubmitClick: () => void;
}

const SkipTheDocs: React.FC<SkipTheDocsProps> = ({ onSubmitClick }) => {
  return (

      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          SkipTheDocs
        </h1>
        <p className="mt-3 text-lg sm:text-xl max-w-2xl mx-auto text-gray-400">
          The ultimate database for your development tool configurations.
        </p>
      </div>
  );
}

export default SkipTheDocs;
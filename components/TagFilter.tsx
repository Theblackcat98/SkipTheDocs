import React from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTags, onTagToggle }) => {
  if (!tags.length) return null;

  return (
    <div className="mb-6" style={{marginTop: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem'}}>
      <h3 className="text-sm font-medium text-gray-400 mb-2">Filter by tags:</h3>
      <div className="flex flex-wrap gap-2">
        {Array.from(new Set(tags)).map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-indigo-600 text-white border border-indigo-500'
                : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-700/50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;

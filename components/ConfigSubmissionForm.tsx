import React, { useState } from 'react';

interface ConfigSubmissionFormProps {
  onSubmit: (data: ConfigData) => void;
  isLoading: boolean;
  onClose: () => void;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

interface ConfigData {
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

export const ConfigSubmissionForm: React.FC<ConfigSubmissionFormProps> = ({ onSubmit, isLoading, onClose, className, onClick }) => {
  const [formData, setFormData] = useState<ConfigData>({
    title: '',
    description: '',
    author: '',
    version: '1.0.0',
    tags: [],
    tool: '',
    category: '',
    compatibility: {
      version_min: '',
      version_max: '',
      os: [],
    },
    content: '',
  });

  const categories = [
    'development',
    'productivity',
    'terminal',
    'editor',
    'shell',
    'system',
    'networking',
    'security',
  ];

  const operatingSystems = ['linux', 'macos', 'windows'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      tags: e.target.value.split(',').map(tag => tag.trim()),
    });
  };

  const handleOsChange = (os: string) => {
    const newOs = formData.compatibility.os.includes(os)
      ? formData.compatibility.os.filter(o => o !== os)
      : [...formData.compatibility.os, os];

    setFormData({
      ...formData,
      compatibility: {
        ...formData.compatibility,
        os: newOs,
      },
    });
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col overflow-hidden ${className}`}
    >
      <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-100">Submit New Configuration</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>
      <main className="flex-grow p-4 md:p-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800 text-gray-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800 text-gray-200"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800 text-gray-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Tool</label>
              <input
                type="text"
                value={formData.tool}
                onChange={(e) => setFormData({...formData, tool: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800 text-gray-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800 text-gray-200"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800 text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Version Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Min version"
                  value={formData.compatibility.version_min}
                  onChange={(e) => setFormData({
                    ...formData,
                    compatibility: {...formData.compatibility, version_min: e.target.value}
                  })}
                  className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800 text-gray-200"
                />
                <input
                  type="text"
                  placeholder="Max version"
                  value={formData.compatibility.version_max}
                  onChange={(e) => setFormData({
                    ...formData,
                    compatibility: {...formData.compatibility, version_max: e.target.value}
                  })}
                  className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800 text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Operating Systems</label>
              <div className="mt-2 space-x-4">
                {operatingSystems.map(os => (
                  <label key={os} className="inline-flex items-center text-gray-200">
                    <input
                      type="checkbox"
                      checked={formData.compatibility.os.includes(os)}
                      onChange={() => handleOsChange(os)}
                      className="rounded border-gray-700 text-indigo-600 focus:ring-indigo-500 bg-gray-800"
                    />
                    <span className="ml-2">{os}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Configuration Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono bg-gray-800 text-gray-200"
                rows={15}
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Configuration'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

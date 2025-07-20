import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ConfigCard from './components/ConfigCard';
import Modal from './components/Modal';
import { ConfigSubmissionForm } from './components/ConfigSubmissionForm';
import type { ConfigFile, PopularTool, ConfigData } from './types.ts';
import { POPULAR_TOOLS } from './constants.tsx';
import matter from 'gray-matter';
import SkipTheDocs from './components/SkipTheDocs.tsx';

const App: React.FC = () => {
  const [configs, setConfigs] = useState<ConfigFile[]>([]);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [filterTerm, setFilterTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalConfig, setActiveModalConfig] = useState<ConfigFile | null>(null);
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedConfigData, setSubmittedConfigData] = useState<string | null>(null);

  useEffect(() => {
    const loadAllConfigs = async () => {
        try {
            const configModules = import.meta.glob('/data/configs/*.*', { query: '?raw', import: 'default' });
            const configsData = await Promise.all(
                Object.entries(configModules).map(async ([path, getContent]) => {
                    const fileContent = await (getContent() as Promise<string>);
                    if (fileContent.trim() === '') {
                        console.warn(`Fetched file is empty: ${path}`);
                        return null;
                    }

                    const { data, content } = matter(fileContent);
                    const fileName = path.split('/').pop() || '';

                    return {
                        id: fileName.replace(/[^a-zA-Z0-9]/g, '-'),
                        toolName: data.toolName || 'Unknown',
                        author: data.author || 'Unknown',
                        description: data.description || 'No description provided.',
                        version: data.version || 'N/A',
                        repositoryUrl: data.repositoryUrl || '',
                        fileName: fileName,
                        filePath: path,
                        content: content,
                    } as ConfigFile;
                })
            );
            setConfigs(configsData.filter((c): c is ConfigFile => c !== null));
        } catch (error) {
            console.error("A critical error occurred while loading config files:", error);
        } finally {
            setIsAppLoading(false);
        }
    };

    loadAllConfigs();
  }, []);

  const handleQuickFilter = useCallback((tool: PopularTool) => {
    setFilterTerm(tool.name);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }, []);

  const openModal = useCallback((config: ConfigFile) => {
    setActiveModalConfig(config);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setActiveModalConfig(null);
  }, []);
  
  const downloadFile = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const handleDownload = useCallback((config: ConfigFile) => {
    downloadFile(config.content, config.fileName);
  }, [downloadFile]);

  const handleModalDownload = useCallback(() => {
    if (activeModalConfig) {
      downloadFile(activeModalConfig.content, activeModalConfig.fileName);
    }
  }, [activeModalConfig, downloadFile]);

  const filteredConfigs = useMemo(() => {
    if (!filterTerm.trim()) return configs;
    const lowercasedFilter = filterTerm.toLowerCase();
    return configs.filter(config =>
      config.toolName.toLowerCase().includes(lowercasedFilter) ||
      config.fileName.toLowerCase().includes(lowercasedFilter) ||
      config.description.toLowerCase().includes(lowercasedFilter)
    );
  }, [configs, filterTerm]);
  
  const clearFilter = () => setFilterTerm('');

  const handleConfigSubmission = async (data: ConfigData) => {
    setIsSubmitting(true);
    try {
      const frontMatter = {
        toolName: data.tool,
        description: data.description,
        author: data.author,
        version: data.version,
        tags: data.tags,
        category: data.category,
        compatibility: data.compatibility
      };

      const fileContent = matter.stringify(data.content, frontMatter);
      
      const formattedOutput = `### New Configuration Submission\n\n**Title:** ${data.title}\n**Tool:** ${data.tool}\n**Author:** ${data.author}\n**Version:** ${data.version}\n**Category:** ${data.category}\n**Tags:** ${data.tags.join(', ')}\n**Compatibility:** OS: ${data.compatibility.os.join(', ')}, Versions: ${data.compatibility.version_min} - ${data.compatibility.version_max}\n\n**Description:**\n${data.description}\n\n\`\`\`\n${data.content}\n\`\`\`\n\n`;

      const encodedTitle = encodeURIComponent(data.title);
      const encodedBody = encodeURIComponent(formattedOutput);
      const issueUrl = `https://github.com/theblackcat98/SkipTheDocs/issues/new?title=${encodedTitle}&body=${encodedBody}`;
      
      window.open(issueUrl, '_blank');
      setIsSubmissionFormOpen(false);
    } catch (error) {
      console.error('Error formatting config data:', error);
      alert('Error formatting configuration data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAppLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-[100]">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-white text-lg font-medium">Loading Configurations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 selection:bg-indigo-500 selection:text-white">
      <Header onSubmitClick={() => setIsSubmissionFormOpen(true)} />
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-12">
          <SkipTheDocs onSubmitClick={() => setIsSubmissionFormOpen(true)} />
          <SearchBar 
            filterTerm={filterTerm}
            setFilterTerm={setFilterTerm}
          />

          <div className="w-full max-w-5xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-200">Or start by selecting a tool</h2>
              <p className="text-gray-400 mt-1">Click a tool to see all available configurations.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {POPULAR_TOOLS.map(tool => (
                <button
                  key={tool.name}
                  onClick={() => handleQuickFilter(tool)}
                  className="flex flex-col items-center justify-center gap-3 p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700/70 hover:border-indigo-500 transition-all duration-200"
                >
                  {tool.icon}
                  <span className="font-semibold text-sm text-center text-gray-300">{tool.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-6xl mt-8 border-t border-gray-700/50 pt-12">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 px-2">
              <h2 className="text-3xl font-bold text-gray-100 mb-4 sm:mb-0">Configuration Library</h2>
               {filterTerm && (
                 <button 
                    onClick={clearFilter}
                    className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                   Clear filter ({filteredConfigs.length} results)
                 </button>
               )}
            </div>

            {filteredConfigs.length > 0 ? (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredConfigs.map(config => (
                  <ConfigCard 
                    key={config.id}
                    config={config} 
                    onView={openModal} 
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 bg-gray-800/30 border border-dashed border-gray-700 rounded-xl">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-xl font-semibold text-gray-200">No Results Found</h3>
                <p className="mt-1 text-base text-gray-400">
                  Your search for "{filterTerm}" did not match any configurations.
                </p>
                <button 
                  onClick={clearFilter}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal}
        config={activeModalConfig}
        onDownload={handleModalDownload}
      />
      {isSubmissionFormOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsSubmissionFormOpen(false)}
        >
          <ConfigSubmissionForm
            onClose={() => setIsSubmissionFormOpen(false)}
            onSubmit={handleConfigSubmission}
            isLoading={isSubmitting}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh]"
          />
        </div>
      )}
    </div>
  );
};

export default App;

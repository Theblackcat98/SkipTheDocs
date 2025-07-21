import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ConfigCard from './components/ConfigCard';
import TagFilter from './components/TagFilter';
import Modal from './components/Modal';
import { ConfigSubmissionForm } from './components/ConfigSubmissionForm';
import type { ConfigFile, PopularTool, ConfigData } from './types';
import { MetadataDb } from './types';
import { POPULAR_TOOLS } from './constants';
import matter from 'gray-matter';
import SkipTheDocs from './components/SkipTheDocs';
import { ExternalLink } from 'lucide-react'; // Import the ExternalLink icon

const App: React.FC = () => {
  const [configs, setConfigs] = useState<ConfigFile[]>([]);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [filterTerm, setFilterTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalConfig, setActiveModalConfig] = useState<ConfigFile | null>(null);
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedConfigData, setSubmittedConfigData] = useState<string | null>(null);


  useEffect(() => {
    const loadAllConfigs = async () => {
        try {
        const response = await fetch('./data/configs/configs_db.json');
        if (!response.ok) {
            throw new Error('Failed to fetch configs_db.json');
        }
        // 3. Use the imported `MetadataDb` type here
        const metadataDb: MetadataDb = await response.json();

        const configContentModules = import.meta.glob('/data/configs/*/*/*.*', {
            query: '?raw',
            import: 'default',
        });
        console.log('DEBUG 1: Glob found these modules:', configContentModules);

        const configsDataPromises = Object.entries(configContentModules).map(
            async ([path, getContent]) => {
            const pathRegex = /data\/configs\/([^/]+)\/([^/]+)\/(.+)$/;
            const match = path.match(pathRegex);
            console.log(`DEBUG 2: Processing path [${path}]. Match result:`, match);

            if (!match) {
                console.warn(`Skipping file with unexpected path: ${path}`);
                return null;
            }

            const [, pathToolName, pathVersion, fileName] = match;

            if (pathVersion === 'latest') return null;

            try {
                const fileContent = (await getContent()) as string;
                if (typeof fileContent !== 'string' || fileContent.trim() === '') {
                console.warn(`Fetched file is empty: ${path}`);
                return null;
                }

                const { content, data: frontmatter } = matter(fileContent);
                const toolMetadata = metadataDb[pathToolName] || {};
                const finalToolName = frontmatter.toolName || pathToolName;
                const finalVersion = frontmatter.version || pathVersion;
                let relatedConfigs: string[] = [];
                if (frontmatter.relatedConfigs) {
                    relatedConfigs = Array.isArray(frontmatter.relatedConfigs) 
                        ? frontmatter.relatedConfigs 
                        : [frontmatter.relatedConfigs];
                }

                // Create the final object, which must match the `ConfigFile` interface
                return {
                toolName: finalToolName,
                version: finalVersion,
                displayName: frontmatter.displayName || toolMetadata.displayName || finalToolName,
                author: frontmatter.author || toolMetadata.author || 'Unknown',
                description: frontmatter.description || toolMetadata.description || 'No description provided.',
                repositoryUrl: frontmatter.repositoryUrl || toolMetadata.repositoryUrl || '',
                tags: frontmatter.tags || [],
                relatedConfigs: relatedConfigs,
                lastModified: frontmatter.lastModified,
                id: `${finalToolName}-${finalVersion}`.replace(/[^a-zA-Z0-9]/g, '-'),
                fileName: fileName,
                filePath: path,
                content: content.trim(),
                } as ConfigFile; // Asserting as the imported type

            } catch (e) {
                console.error(`Error processing file: ${path}`, e);
                return null;
            }
            }
        );

        const resolvedConfigs = await Promise.all(configsDataPromises);
        
        console.log('DEBUG 3: Final array before filtering and setting state:', resolvedConfigs);
        // This filter now correctly checks against the imported `ConfigFile` type
        setConfigs(resolvedConfigs.filter((c): c is ConfigFile => c !== null));
        console.log('DEBUG 4: Final array being passed to setConfigs:', resolvedConfigs);
        
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

  // Get all unique tags from all configs
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    configs.forEach(config => {
      config.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [configs]);

  const filteredConfigs = useMemo(() => {
    let result = [...configs];
    
    // Apply search term filter
    if (filterTerm.trim()) {
      const lowercasedFilter = filterTerm.toLowerCase();
      result = result.filter(config =>
        config.toolName.toLowerCase().includes(lowercasedFilter) ||
        config.fileName.toLowerCase().includes(lowercasedFilter) ||
        config.description.toLowerCase().includes(lowercasedFilter) ||
        config.tags?.some(tag => tag.toLowerCase().includes(lowercasedFilter))
      );
    }
    
    // Apply tag filter
    if (selectedTags.length > 0) {
      result = result.filter(config => 
        selectedTags.every(tag => config.tags?.includes(tag))
      );
    }
    
    return result;
  }, [configs, filterTerm, selectedTags]);
  
  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  }, []);
  
  const clearFilters = useCallback(() => {
    setFilterTerm('');
    setSelectedTags([]);
  }, []);
  
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
        <div className="flex flex-col items-center gap-5">
          <SkipTheDocs onSubmitClick={() => setIsSubmissionFormOpen(true)} />
          
          <div className="w-full max-w-4xl mx-auto space-y-4">
            <SearchBar 
              filterTerm={filterTerm}
              setFilterTerm={setFilterTerm}
            />
            

            
            {(filterTerm || selectedTags.length > 0) && (
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>
                  Showing {filteredConfigs.length} result{filteredConfigs.length !== 1 ? 's' : ''}
                </span>
                <button 
                  onClick={clearFilters}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

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
            <TagFilter 
              tags={allTags} 
              selectedTags={selectedTags} 
              onTagToggle={handleTagToggle} 
            />
          </div>

          <div className="w-full max-w-6xl mt-8 border-t border-gray-700/50 pt-12" style={{paddingTop: '1.5rem', marginTop: '0px'}}>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 px-2">
              <h2 className="text-3xl font-bold text-gray-100 mb-4 sm:mb-0">Configuration Library</h2>
              {(filterTerm || selectedTags.length > 0) && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  Clear filters ({filteredConfigs.length} results)
                </button>
              )}
            </div>
            {filteredConfigs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredConfigs.map(config => (
                  <div key={config.id} id={config.id}>
                    <ConfigCard 
                      config={config} 
                      onView={openModal} 
                      onDownload={handleDownload}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 bg-gray-800/30 border border-dashed border-gray-700 rounded-xl">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-xl font-semibold text-gray-200">No Results Found</h3>
                <p className="mt-1 text-base text-gray-400">
                  {filterTerm 
                    ? `Your search for "${filterTerm}" did not match any configurations.` 
                    : 'No configurations match the selected filters.'}
                </p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Config Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {activeModalConfig && (
          <>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-100">{activeModalConfig.toolName}</h2>
                <p className="text-indigo-400 font-mono text-sm">{activeModalConfig.fileName}</p>
              </div>
              <button
                onClick={handleModalDownload}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>

            {activeModalConfig.relatedConfigs && activeModalConfig.relatedConfigs.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Related Configs</h3>
                <div className="flex flex-wrap gap-2">
                  {activeModalConfig.relatedConfigs.map((related, index) => {
                    const relatedConfig = configs.find(c => 
                      c.fileName === related || c.id === related
                    );
                    
                    if (!relatedConfig) return null;
                    
                    return (
                      <a
                        key={index}
                        href={`#${relatedConfig.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          closeModal();
                          // Scroll to the related config
                          document.getElementById(relatedConfig.id)?.scrollIntoView({
                            behavior: 'smooth'
                          });
                          // Highlight the related config
                          const element = document.getElementById(relatedConfig.id);
                          if (element) {
                            element.classList.add('ring-2', 'ring-indigo-500');
                            setTimeout(() => {
                              element.classList.remove('ring-2', 'ring-indigo-500');
                            }, 2000);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-indigo-400 bg-indigo-900/30 rounded-full border border-indigo-800 hover:bg-indigo-800/30 transition-colors"
                      >
                        {relatedConfig.displayName || relatedConfig.toolName}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-4 overflow-auto max-h-[60vh]">
              <pre className="text-sm text-gray-200">
                <code>{activeModalConfig.content}</code>
              </pre>
            </div>
          </>
        )}
      </Modal>

      {/* Submission Form Modal */}
      <Modal isOpen={isSubmissionFormOpen} onClose={() => setIsSubmissionFormOpen(false)}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Submit a New Configuration</h2>
          <ConfigSubmissionForm 
            onSubmit={handleConfigSubmission}
            isLoading={isSubmitting}
            onClose={() => setIsSubmissionFormOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default App;

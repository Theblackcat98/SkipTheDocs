import React, { useState, useCallback, useEffect } from 'react';
import type { ConfigFile } from '../types';
import { X, Copy, Download, Check, ExternalLink } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  config?: (ConfigFile & { content: string }) | null;
  onDownload?: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, config, onDownload, title, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (config) {
      navigator.clipboard.writeText(config.content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [config]);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        onClose();
       }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;
  if (isOpen && !config && !children) return null;

  // Format the last modified date
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString; // Return the original string if formatting fails
    }
  };
  
  // Determine if this is a config modal or a form modal
  const isConfigModal = !children && !!config;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        style={{paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem'}}
        onClick={e => e.stopPropagation()}
      >
        {children || (isConfigModal && config && (
          <>
            <header className="flex items-start justify-between p-6 border-b border-gray-700 flex-shrink-0">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-gray-100">{config.displayName || config.toolName}</h2>
                  {config.version && (
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-900/50 text-indigo-200 rounded-full border border-indigo-800">
                      v{config.version}
                    </span>
                  )}
                  
                </div>
                <p className="text-sm text-indigo-400 font-mono">{config.fileName}</p>
                
                {/* Description */}
                {config.description && (
                  <p className="text-gray-300 mt-2">{config.description}</p>
                )}
                
                {/* Tags */}
                {config.tags && config.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {config.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-gray-800/50 text-gray-200 rounded-full border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-400 mt-3">
                  {config.author && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Author:</span>
                      <span>{config.author}</span>
                    </div>
                  )}
                  
                  {config.lastModified && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Last Updated:</span>
                      <span>{formatDate(config.lastModified)}</span>
                    </div>
                  )}
                  
                  {config.repositoryUrl && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Repository:</span>
                      <a 
                        href={config.repositoryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-400 hover:underline flex items-center gap-1"
                        onClick={e => e.stopPropagation()}
                      >
                        View on GitHub
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                onClick={onClose} 
                className="p-2 -mt-2 -mr-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" 
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </header>
            <main className="flex-grow p-6 overflow-y-auto bg-gray-900/40">
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50">
                <div className="px-4 py-3 border-b border-gray-700 bg-gray-800/50 flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-400">{config.fileName}</span>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="m-0">
                  <code className="block p-4 font-mono text-sm text-gray-200 whitespace-pre-wrap break-words">
                    {config.content}
                  </code>
                </pre>
              </div>
            </main>
            <footer className="flex items-center justify-end gap-2 p-4 border-t border-gray-700 flex-shrink-0 bg-gray-900">
               <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
              <button
                onClick={onDownload}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </footer>
          </>
        ))}
      </div>
      <style>{`
        @keyframes fade-in { 
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Modal;

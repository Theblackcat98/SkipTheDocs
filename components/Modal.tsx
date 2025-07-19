
import React, { useState, useCallback, useEffect } from 'react';
import type { ConfigFile } from '../types';
import { IconCopy, IconDownload, IconCheck } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: (ConfigFile & { content: string }) | null;
  onDownload: () => void;
  onAskAI: (question: string) => void;
  aiResponse: string | null;
  isAiLoading: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, config, onDownload, onAskAI, aiResponse, isAiLoading }) => {
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState('');

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
      setQuestion('');
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
  
  const handleAskClick = () => {
    if (question.trim() && !isAiLoading) {
      onAskAI(question);
    }
  };

  if (!isOpen || !config) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-100">{config.tool}</h2>
            <p className="text-sm text-indigo-400 font-mono">{config.fileName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <main className="flex-grow p-4 md:p-6 overflow-y-auto bg-gray-900/40">
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50">
            <pre><code className="block p-4 font-mono text-sm text-gray-200 whitespace-pre-wrap break-words">{config.content}</code></pre>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-100">AI Config Helper</h3>
                <span className="text-xs font-medium text-indigo-400 bg-indigo-900/50 px-2 py-1 rounded-full">BETA</span>
            </div>
            
            <p className="text-sm text-gray-400 mb-4">Ask a question about this configuration file.</p>
            
            <div className="flex items-start gap-2">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., How do I change the keybinding for splitting a pane?"
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                rows={2}
                disabled={isAiLoading}
                aria-label="Question about the configuration"
              />
              <button
                onClick={handleAskClick}
                disabled={isAiLoading || !question.trim()}
                className="flex items-center justify-center shrink-0 px-4 h-[52px] text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                aria-label="Ask AI"
              >
                {isAiLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.5 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.5 18l-1.178.398a3.375 3.375 0 00-2.424 2.424z" />
                    </svg>
                )}
              </button>
            </div>
            {isAiLoading && !aiResponse && (
                <div className="mt-4 p-4 text-center text-gray-400 animate-pulse">
                    <p>AI is thinking...</p>
                </div>
            )}
            {aiResponse && (
              <div className="mt-4 p-4 bg-gray-800/70 border border-gray-700/80 rounded-lg animate-fade-in">
                <p className="text-gray-200 whitespace-pre-wrap font-sans text-base">{aiResponse}</p>
              </div>
            )}
          </div>
        </main>
        <footer className="flex items-center justify-end gap-2 p-4 border-t border-gray-700 flex-shrink-0 bg-gray-900">
           <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
          >
            {copied ? <IconCheck className="w-5 h-5" /> : <IconCopy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
          >
            <IconDownload className="w-5 h-5" />
            Download
          </button>
        </footer>
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

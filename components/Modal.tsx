import React, { useState, useCallback, useEffect } from 'react';
import type { ConfigFile } from '../types.ts';
import { IconCopy, IconDownload, IconCheck } from '../constants.tsx';

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
        {children ? (
          children
        ) : config && (
          <>
            <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-100">{config.toolName}</h2>
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
          </>
        )}
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

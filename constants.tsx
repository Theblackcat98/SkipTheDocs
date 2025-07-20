import React from 'react';
import type { PopularTool } from './types.ts';
import { Terminal, SquareTerminal, Fish, Cat, Grid2x2, Ghost } from 'lucide-react';

export const POPULAR_TOOLS: PopularTool[] = [
  { name: 'Ghostty', icon: <Ghost className="w-8 h-8 text-green-400" /> },
  { name: 'Tmux', icon: <Grid2x2 className="w-8 h-8 text-blue-400" /> },
  { name: 'Zsh', icon: <Terminal className="w-8 h-8 text-yellow-400" /> },
  { name: 'Kitty', icon: <Cat className="w-8 h-8 text-pink-400" /> },
  { name: 'Alacritty', icon: <SquareTerminal className="w-8 h-8 text-purple-400" /> },
  { name: 'Fish', icon: <Fish className="w-8 h-8 text-red-400" /> },
];

export const IconCopy = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V6.75a1.125 1.125 0 011.125-1.125H6.75m9 12.75h3.375c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H12.75c-.621 0-1.125.504-1.125 1.125v9.75c0 .621.504 1.125 1.125 1.125h3.375z" />
  </svg>
);

export const IconDownload = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const IconCheck = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);
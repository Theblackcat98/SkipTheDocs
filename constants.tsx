import React from 'react';
import type { PopularTool } from './types.ts';

export const IconTerminal = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 12l4.179 2.25m0 0l5.571 3m-5.571-3l-4.179-2.25m11.142 0l5.571 3m-5.571-3l4.179-2.25m-16.854 0L12 2.25 17.571 6H20.25v12H17.571L12 21.75l-5.571-3H3.75V6H6.429z" />
  </svg>
);

export const IconCode = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
);


export const POPULAR_TOOLS: PopularTool[] = [
  { name: 'Neovim', icon: <IconCode className="w-8 h-8 text-green-400" /> },
  { name: 'Tmux', icon: <IconTerminal className="w-8 h-8 text-blue-400" /> },
  { name: 'Zsh', icon: <IconTerminal className="w-8 h-8 text-yellow-400" /> },
  { name: 'Kitty', icon: <IconTerminal className="w-8 h-8 text-pink-400" /> },
  { name: 'Alacritty', icon: <IconTerminal className="w-8 h-8 text-purple-400" /> },
  { name: 'Fish', icon: <IconTerminal className="w-8 h-8 text-red-400" /> },
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
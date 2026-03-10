import React from 'react';

export function Header() {
  return (
    <header className="h-14 border-b border-gray-200 flex items-center px-6 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg text-gray-900">MRT Design System</span>
        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
          v0.2.0
        </span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <a
          href="https://github.com/ran-sunwoo/mrt-ds-poc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}

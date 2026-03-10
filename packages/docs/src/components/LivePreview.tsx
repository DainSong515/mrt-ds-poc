import React from 'react';

interface LivePreviewProps {
  children: React.ReactNode;
  label?: string;
}

export function LivePreview({ children, label }: LivePreviewProps) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {label && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-medium">
          {label}
        </div>
      )}
      <div className="p-6 bg-white flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  );
}

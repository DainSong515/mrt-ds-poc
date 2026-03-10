import React from 'react';

interface AntiPatternBlockProps {
  patterns: string[];
}

export function AntiPatternBlock({ patterns }: AntiPatternBlockProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-semibold text-red-700 mb-2">안티패턴 주의</p>
      <ul className="space-y-1">
        {patterns.map((pattern, i) => (
          <li key={i} className="text-sm text-red-600 font-mono">
            {pattern}
          </li>
        ))}
      </ul>
    </div>
  );
}

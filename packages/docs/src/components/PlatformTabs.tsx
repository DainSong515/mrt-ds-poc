import React from 'react';

type Platform = 'web' | 'ios';

export function PlatformTabs({ platform, onChange }: { platform: Platform; onChange: (p: Platform) => void }) {
  return (
    <div className="flex gap-1 mb-6">
      {(['web', 'ios'] as const).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
            platform === p
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {p === 'web' ? 'Web (React)' : 'iOS (Swift)'}
        </button>
      ))}
    </div>
  );
}

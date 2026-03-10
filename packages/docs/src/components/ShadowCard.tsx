import React from 'react';

interface ShadowCardProps {
  name: string;
  value: string;
  description?: string;
}

export function ShadowCard({ name, value, description }: ShadowCardProps) {
  const isVertical = name.endsWith('V');

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
          {isVertical ? '역방향' : '표준'}
        </span>
      </div>
      <div
        className="w-full h-16 rounded-lg bg-white"
        style={{ boxShadow: value }}
      />
      <p className="text-xs font-mono text-gray-400 mt-3 break-all leading-relaxed">{value}</p>
    </div>
  );
}

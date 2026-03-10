import React, { useState } from 'react';

interface ColorSwatchProps {
  name: string;
  value: string;
  ref?: string;
  description?: string;
  compact?: boolean;
}

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export function ColorSwatch({ name, value, ref: refToken, description, compact = false }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (compact) {
    return (
      <div
        className="flex flex-col rounded overflow-hidden border border-gray-200 cursor-pointer hover:scale-105 transition-transform"
        onClick={handleCopy}
        title={`${value} (클릭하여 복사)`}
      >
        <div
          className="h-10 w-full"
          style={{ backgroundColor: value }}
        />
        <div className="bg-white px-2 py-1">
          <p className="text-xs font-mono text-gray-700 truncate">{name}</p>
          <p className="text-xs text-gray-400">{copied ? '복사됨!' : value}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCopy}
      title="클릭하여 hex 복사"
    >
      <div
        className="h-16 w-full flex items-end px-3 pb-2"
        style={{ backgroundColor: value }}
      >
        <span
          className="text-xs font-mono opacity-80"
          style={{ color: getTextColor(value.startsWith('#') ? value : '#888888') }}
        >
          {copied ? '복사됨!' : value}
        </span>
      </div>
      <div className="bg-white px-3 py-2">
        <p className="text-sm font-medium text-gray-800">{name}</p>
        {refToken && <p className="text-xs text-gray-400 font-mono">{refToken}</p>}
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
    </div>
  );
}

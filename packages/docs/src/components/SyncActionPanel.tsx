import React, { useState } from 'react';
import { TARGET_REPOS, type SyncInfo } from '../data/sync-mappings';

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function SyncActionPanel({
  syncInfo,
  platform,
}: {
  syncInfo: SyncInfo;
  platform: 'web' | 'ios';
}) {
  return (
    <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs space-y-2">
      <div className="font-semibold text-gray-700">
        {platform === 'web' ? 'Web' : 'iOS'} 수정 필요
        <span className="font-normal text-gray-400 ml-1">
          &rarr; {TARGET_REPOS[syncInfo.repo]?.label || syncInfo.repo}
        </span>
      </div>
      <div className="space-y-1 text-gray-600">
        <div>
          <span className="text-gray-400">File: </span>
          <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-700">
            {syncInfo.filePath}
          </code>
        </div>
        <div>
          <span className="text-gray-400">Path: </span>
          <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-700">
            {syncInfo.jsonPath}
          </code>
        </div>
        <div className="flex items-center gap-1.5">
          <code className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded border border-red-200">
            {syncInfo.currentValue}
          </code>
          <span className="text-gray-400">&rarr;</span>
          <code className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-200">
            {syncInfo.expectedValue}
          </code>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <CopyButton text={syncInfo.expectedValue} label="값 복사" />
        <CopyButton text={syncInfo.claudeCommand} label="Claude 명령어 복사" />
      </div>
    </div>
  );
}

import React from 'react';
import type { PropMeta } from '../data/components';

interface PropsTableProps {
  props: Record<string, PropMeta>;
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Prop</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Type</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Default</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">설명</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props).map(([name, meta]) => (
            <tr key={name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2.5">
                <code className="text-blue-600 font-mono text-xs">{name}</code>
                {meta.required && (
                  <span className="ml-1.5 text-xs text-red-500 font-medium">*</span>
                )}
              </td>
              <td className="px-4 py-2.5">
                <code className="text-purple-600 font-mono text-xs break-all">{meta.type}</code>
              </td>
              <td className="px-4 py-2.5">
                {meta.default ? (
                  <code className="text-gray-500 font-mono text-xs">{meta.default}</code>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-4 py-2.5 text-gray-600 text-xs">{meta.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

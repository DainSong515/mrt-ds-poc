import React, { useState } from 'react';
import { ColorSwatch } from '../../components/ColorSwatch';
import { parseColorScale, parseSemanticColors } from '../../data/tokens';

const COLOR_GROUPS_ORDER = ['gray', 'blue', 'green', 'yellow', 'red', 'purple', 'black', 'white'];

type TabId = 'scale' | 'semantic';

export default function ColorPage() {
  const [tab, setTab] = useState<TabId>('scale');

  const scaleColors = parseColorScale();
  const semanticColors = parseSemanticColors();

  const semanticGroups = ['surface', 'content', 'border', 'interactive'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Color</h1>
        <p className="mt-2 text-gray-500">
          디자인 시스템의 색상 토큰. Scale 토큰은 원시 값이며, Semantic 토큰은 의도 기반으로 참조한다.
        </p>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 border-b border-gray-200">
        {(['scale', 'semantic'] as TabId[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === t
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'scale' ? 'Scale' : 'Semantic'}
          </button>
        ))}
      </div>

      {tab === 'scale' && (
        <div className="space-y-8">
          {COLOR_GROUPS_ORDER.map((group) => {
            const value = scaleColors[group];
            if (!value) return null;

            if (typeof value === 'string') {
              return (
                <div key={group}>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 capitalize">{group}</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    <ColorSwatch name={group} value={value} compact />
                  </div>
                </div>
              );
            }

            return (
              <div key={group}>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 capitalize">{group}</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {Object.entries(value).map(([step, hex]) => (
                    <ColorSwatch key={step} name={step} value={hex} compact />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'semantic' && (
        <div className="space-y-8">
          {semanticGroups.map((group) => {
            const entries = semanticColors[group];
            if (!entries) return null;

            return (
              <div key={group}>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 capitalize">{group}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {Object.entries(entries).map(([name, entry]) => (
                    <ColorSwatch
                      key={name}
                      name={`${group}.${name}`}
                      value={entry.value}
                      ref={entry.ref}
                      description={entry.description}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

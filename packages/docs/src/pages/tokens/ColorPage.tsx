import React, { useState } from 'react';
import { ColorSwatch } from '../../components/ColorSwatch';
import { FigmaLink } from '../../components/FigmaLink';
import { PlatformTabs } from '../../components/PlatformTabs';
import { CodeBlock } from '../../components/CodeBlock';
import { DesignCheckSection } from '../../components/DesignCheckSection';
import { parseColorScale, parseSemanticColors } from '../../data/tokens';

const COLOR_GROUPS_ORDER = ['gray', 'blue', 'green', 'yellow', 'red', 'purple', 'black', 'white'];

type TabId = 'scale' | 'semantic';

const IOS_COLOR_EXAMPLE = `// DynamicColor.swift
enum DynamicColor: String {
    case gray50  = "#F8F9FA"
    case gray100 = "#E9ECEF"
    case gray300 = "#CED4DA"
    case gray700 = "#495056"
    case gray1000 = "#101418"

    case blue500 = "#2B96ED"
    case green500 = "#28A745"
    case red500 = "#E84118"
    case yellow500 = "#FFC107"
    // ...
}

// 사용 예시
let bgColor = DynamicColor.gray1000.color
let textColor = DynamicColor.white.color`;

export default function ColorPage() {
  const [tab, setTab] = useState<TabId>('scale');
  const [platform, setPlatform] = useState<'web' | 'ios'>('web');

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
        <FigmaLink url="https://www.figma.com/design/TRtkkl5QJ0ly261AcqyUF9/Myrealtrip-Design-System?node-id=8144-75342" />
      </div>

      <PlatformTabs platform={platform} onChange={setPlatform} />

      {platform === 'ios' ? (
        <div className="space-y-8">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm space-y-1">
            <p><span className="font-semibold text-purple-800">Framework:</span> <span className="text-purple-700">UIKit / SwiftUI</span></p>
            <p><span className="font-semibold text-purple-800">Module:</span> <code className="text-purple-700">CommonLayer/DynamicStyle/DynamicColor.swift</code></p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">DynamicColor enum</h2>
            <p className="text-sm text-gray-500 mb-3">
              iOS에서는 DynamicColor enum으로 색상을 관리합니다. 각 케이스가 hex 값을 rawValue로 가집니다.
            </p>
            <CodeBlock code={IOS_COLOR_EXAMPLE} />
          </section>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-yellow-800 mb-1">Web vs iOS 색상 차이</p>
            <p className="text-sm text-yellow-700">
              일부 색상이 플랫폼 간 다를 수 있습니다. 예: gray1000 — Web: #141719, iOS: #101418
            </p>
          </div>

        </div>
      ) : (
      <>

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

      </>
      )}

      {/* Design Check — web + iOS 함께 표시 */}
      <DesignCheckSection component="Color" />
    </div>
  );
}

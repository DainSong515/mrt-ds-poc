import React, { useState } from 'react';
import { PropsTable } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';
import { AntiPatternBlock } from '../../components/AntiPatternBlock';
import { FigmaLink } from '../../components/FigmaLink';
import { PlatformTabs } from '../../components/PlatformTabs';
import { IOSSection } from '../../components/iOSSection';
import { DesignCheckSection } from '../../components/DesignCheckSection';
import { TEXT_META } from '../../data/components';
import { parseTypography } from '../../data/tokens';

type CategoryTab = 'display' | 'headline' | 'paragraph' | 'caption';

const CATEGORY_LABELS: Record<CategoryTab, string> = {
  display: 'Display', headline: 'Headline', paragraph: 'Paragraph', caption: 'Caption',
};

type ExampleTab = keyof typeof TEXT_META.usageExamples;

const SAMPLE_TEXTS: Record<CategoryTab, string> = {
  display: '마이리얼트립',
  headline: '제주도 3박 4일 패키지',
  paragraph: '항공, 호텔, 현지투어를 한번에 예약할 수 있는 특가 상품입니다.',
  caption: '2024년 3월 15일 출발 · 성인 2인',
};

export default function TextPage() {
  const [tab, setTab] = useState<CategoryTab>('headline');
  const [exampleTab, setExampleTab] = useState<ExampleTab>('기본');
  const [previewColor, setPreviewColor] = useState('#141719');
  const [lineClamp, setLineClamp] = useState(0);
  const [platform, setPlatform] = useState<'web' | 'ios'>('web');

  const typographies = parseTypography();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Text</h1>
        <p className="mt-2 text-gray-500">{TEXT_META.description}</p>
        {TEXT_META.figmaUrl && <div><FigmaLink url={TEXT_META.figmaUrl} /></div>}
      </div>

      <PlatformTabs platform={platform} onChange={setPlatform} />

      {platform === 'ios' && TEXT_META.ios ? (
        <IOSSection ios={TEXT_META.ios} />
      ) : (
      <>
      <div>
        <code className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
          import {'{ Text }'} from '{TEXT_META.importPath}'
        </code>
      </div>

      {/* 네이밍 규칙 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-800 mb-1">네이밍 규칙</p>
        <p className="text-sm text-blue-700 font-mono">{'{카테고리}{굵기}{크기}'}</p>
        <p className="text-sm text-blue-700 mt-1">
          카테고리: display / headline / paragraph / caption
          &nbsp;|&nbsp; 굵기: Bold(700) / Normal(headline:600, paragraph:500)
        </p>
      </div>

      {/* 인터랙티브 미리보기 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">라이브 미리보기</h2>
        <div className="flex flex-wrap gap-4 items-center mb-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span>색상</span>
            <input type="color" value={previewColor} onChange={(e) => setPreviewColor(e.target.value)} className="w-8 h-8 rounded border" />
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span>lineClamp</span>
            <select value={lineClamp} onChange={(e) => setLineClamp(Number(e.target.value))} className="border border-gray-200 rounded px-2 py-1 text-xs">
              <option value={0}>없음</option>
              <option value={1}>1줄</option>
              <option value={2}>2줄</option>
              <option value={3}>3줄</option>
            </select>
          </label>
        </div>

        {/* 카탈로그 탭 */}
        <div className="flex gap-1 border-b border-gray-200 mb-3">
          {(Object.keys(CATEGORY_LABELS) as CategoryTab[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setTab(cat)}
              className={`px-4 py-1.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === cat ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="space-y-1">
          {(typographies[tab] ?? []).map((entry) => (
            <div key={entry.name} className="flex items-center gap-4 px-4 py-3 border border-gray-100 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <div className="w-52 shrink-0">
                <p className="text-xs font-mono text-blue-600">{entry.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{entry.fontSize} / {entry.fontWeight}w</p>
              </div>
              <div
                className="flex-1 overflow-hidden"
                style={lineClamp > 0 ? {
                  display: '-webkit-box',
                  WebkitLineClamp: lineClamp,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                } as React.CSSProperties : {}}
              >
                <span style={{
                  fontSize: entry.fontSize,
                  fontWeight: entry.fontWeight,
                  lineHeight: entry.lineHeight,
                  color: previewColor,
                }}>
                  {SAMPLE_TEXTS[tab]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Props 테이블 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Props</h2>
        <PropsTable props={TEXT_META.props} />
      </section>

      {/* 코드 예시 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">코드 예시</h2>
        <div className="flex gap-1 border-b border-gray-200 mb-3">
          {Object.keys(TEXT_META.usageExamples).map((key) => (
            <button
              key={key}
              onClick={() => setExampleTab(key as ExampleTab)}
              className={`px-4 py-1.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                exampleTab === key ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <CodeBlock code={TEXT_META.usageExamples[exampleTab]} />
      </section>

      {/* 안티패턴 */}
      {TEXT_META.antiPatterns && (
        <section>
          <AntiPatternBlock patterns={TEXT_META.antiPatterns} />
        </section>
      )}
      {/* Design Check */}
      <DesignCheckSection component="Text" platform={platform} />
      </>
      )}
    </div>
  );
}

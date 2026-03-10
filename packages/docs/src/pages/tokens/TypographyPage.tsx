import React, { useState } from 'react';
import { parseTypography } from '../../data/tokens';

type CategoryTab = 'display' | 'headline' | 'paragraph' | 'caption';

const CATEGORY_LABELS: Record<CategoryTab, string> = {
  display: 'Display',
  headline: 'Headline',
  paragraph: 'Paragraph',
  caption: 'Caption',
};

const SAMPLE_TEXT = '마이리얼트립에서 특별한 여행을 시작하세요.';

export default function TypographyPage() {
  const [tab, setTab] = useState<CategoryTab>('headline');
  const typographies = parseTypography();

  const categories = Object.keys(CATEGORY_LABELS) as CategoryTab[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Typography</h1>
        <p className="mt-2 text-gray-500">
          타이포그래피 토큰. {'{카테고리}{굵기}{크기}'} 패턴으로 네이밍.
          Bold(700) / Normal(headline: 600, paragraph: 500) 굵기 체계.
        </p>
      </div>

      {/* 네이밍 규칙 박스 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-800 mb-1">네이밍 규칙</p>
        <p className="text-sm text-blue-700 font-mono">
          headlineBold20 = headline + Bold(700) + 20px
        </p>
        <p className="text-sm text-blue-700 font-mono mt-0.5">
          paragraphNormal16 = paragraph + Normal(500) + 16px
        </p>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 border-b border-gray-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setTab(cat)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === cat
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* 타이포그래피 목록 */}
      <div className="space-y-1">
        {(typographies[tab] ?? []).map((entry) => (
          <div
            key={entry.name}
            className="flex items-center gap-4 px-4 py-4 border border-gray-100 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="w-48 shrink-0">
              <p className="text-xs font-mono text-blue-600 truncate">{entry.name}</p>
              <div className="text-xs text-gray-400 mt-0.5 space-x-2">
                <span>{entry.fontSize}</span>
                <span>/{entry.lineHeight}</span>
                <span>w{entry.fontWeight}</span>
                {entry.letterSpacing && <span>ls{entry.letterSpacing}</span>}
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p
                style={{
                  fontSize: entry.fontSize,
                  fontWeight: entry.fontWeight,
                  lineHeight: entry.lineHeight,
                  letterSpacing: entry.letterSpacing,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                className="text-gray-800"
              >
                {SAMPLE_TEXT}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

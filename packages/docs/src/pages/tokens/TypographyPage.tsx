import React, { useState } from 'react';
import { FigmaLink } from '../../components/FigmaLink';
import { PlatformTabs } from '../../components/PlatformTabs';
import { CodeBlock } from '../../components/CodeBlock';
import { DesignCheckSection } from '../../components/DesignCheckSection';
import { parseTypography } from '../../data/tokens';

type CategoryTab = 'display' | 'headline' | 'paragraph' | 'caption';

const CATEGORY_LABELS: Record<CategoryTab, string> = {
  display: 'Display',
  headline: 'Headline',
  paragraph: 'Paragraph',
  caption: 'Caption',
};

const SAMPLE_TEXT = '마이리얼트립에서 특별한 여행을 시작하세요.';

const IOS_TYPO_EXAMPLE = `// UDTypography.swift
enum UDTypography {
    case headlineBold20
    case headlineNormal20
    case paragraphBold16
    case paragraphNormal16
    case captionBold13
    // ...
}

// UDTypography+Attribute.swift
extension UDTypography {
    var attribute: Attribute {
        switch self {
        case .headlineBold20:
            return Attribute(fontWeight: .bold, fontSize: 20,
                           lineHeightMultiple: 1.4, kerning: -0.02)
        case .paragraphNormal16:
            return Attribute(fontWeight: .medium, fontSize: 16,
                           lineHeightMultiple: 1.5, kerning: -0.02)
        // ...
        }
    }
}

// 사용 예시 (Pretendard 폰트)
label.applyTypography(.headlineBold20)`;

export default function TypographyPage() {
  const [tab, setTab] = useState<CategoryTab>('headline');
  const [platform, setPlatform] = useState<'web' | 'ios'>('web');
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
        <FigmaLink url="https://www.figma.com/design/TRtkkl5QJ0ly261AcqyUF9/Myrealtrip-Design-System?node-id=8144-74939" />
      </div>

      <PlatformTabs platform={platform} onChange={setPlatform} />

      {platform === 'ios' ? (
        <div className="space-y-8">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm space-y-1">
            <p><span className="font-semibold text-purple-800">Framework:</span> <span className="text-purple-700">UIKit / SwiftUI</span></p>
            <p><span className="font-semibold text-purple-800">Module:</span> <code className="text-purple-700">CommonLayer/UDTypography.swift</code></p>
            <p><span className="font-semibold text-purple-800">Extension:</span> <code className="text-purple-700">UDTypography+Attribute.swift</code></p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-800 mb-1">네이밍 규칙 (동일)</p>
            <p className="text-sm text-blue-700 font-mono">
              .headlineBold20 = headline + Bold + 20pt
            </p>
            <p className="text-sm text-blue-700 font-mono mt-0.5">
              .paragraphNormal16 = paragraph + Normal(medium) + 16pt
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Attribute: fontWeight, fontSize, lineHeightMultiple, kerning
            </p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">UDTypography enum</h2>
            <CodeBlock code={IOS_TYPO_EXAMPLE} />
          </section>

        </div>
      ) : (
      <>

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

      </>
      )}

      {/* Design Check — web + iOS 함께 표시 */}
      <DesignCheckSection component="Typography" />
    </div>
  );
}

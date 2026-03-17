import React, { useState } from 'react';
import { PropsTable } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';
import { AntiPatternBlock } from '../../components/AntiPatternBlock';
import { LivePreview } from '../../components/LivePreview';
import { FigmaLink } from '../../components/FigmaLink';
import { PlatformTabs } from '../../components/PlatformTabs';
import { IOSSection } from '../../components/iOSSection';
import { DesignCheckSection } from '../../components/DesignCheckSection';
import { TABBAR_META } from '../../data/components';

type ExampleTab = keyof typeof TABBAR_META.usageExamples;

const COLORS = {
  blue: { 500: '#2b96ed' },
  gray: { 100: '#e9ecef', 300: '#ced4da', 700: '#495056' },
  red: '#e84118',
  white: '#FFFFFF',
} as const;

const DEMO_TABS = [
  { key: 'all', label: '전체' },
  { key: 'flight', label: '항공' },
  { key: 'hotel', label: '숙소' },
  { key: 'tour', label: '투어/티켓' },
  { key: 'car', label: '렌터카' },
];

const BADGE_TABS = [
  { key: 'all', label: '전체' },
  { key: 'new', label: '신규', badge: true },
  { key: 'promo', label: '프로모션' },
  { key: 'disabled', label: '준비중', disabled: true },
];

function PreviewTabBar({ tabs, size = 'medium' }: {
  tabs: { key: string; label: string; badge?: boolean; disabled?: boolean }[];
  size?: 'medium' | 'small';
}) {
  const [active, setActive] = useState(tabs[0].key);
  const spec = size === 'medium'
    ? { height: '44px', fontSize: '16px', px: '16px', indicator: '2px' }
    : { height: '36px', fontSize: '14px', px: '12px', indicator: '2px' };

  return (
    <div style={{
      display: 'flex',
      borderBottom: `1px solid ${COLORS.gray[100]}`,
      backgroundColor: COLORS.white,
    }}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        const isDisabled = tab.disabled ?? false;
        const textColor = isDisabled
          ? COLORS.gray[300]
          : isActive ? COLORS.blue[500] : COLORS.gray[700];

        return (
          <button
            key={tab.key}
            onClick={isDisabled ? undefined : () => setActive(tab.key)}
            disabled={isDisabled}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              height: spec.height,
              paddingLeft: spec.px,
              paddingRight: spec.px,
              border: 'none',
              backgroundColor: 'transparent',
              color: textColor,
              fontSize: spec.fontSize,
              fontWeight: isActive ? 700 : 400,
              fontFamily: 'inherit',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
            {tab.badge && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: COLORS.red,
                color: COLORS.white,
                fontSize: '9px',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                N
              </span>
            )}
            {isActive && (
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: spec.indicator,
                backgroundColor: COLORS.blue[500],
                borderRadius: '1px 1px 0 0',
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function TabBarPage() {
  const [exampleTab, setExampleTab] = useState<ExampleTab>('기본');
  const [platform, setPlatform] = useState<'web' | 'ios'>('web');

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">TabBar</h1>
        <p className="mt-2 text-gray-500">{TABBAR_META.description}</p>
        {TABBAR_META.figmaUrl && <div><FigmaLink url={TABBAR_META.figmaUrl} /></div>}
      </div>

      <PlatformTabs platform={platform} onChange={setPlatform} />

      {platform === 'ios' && TABBAR_META.ios ? (
        <IOSSection ios={TABBAR_META.ios} />
      ) : (
      <>
      <div>
        <code className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
          import {'{ TabBar }'} from '{TABBAR_META.importPath}'
        </code>
      </div>

      {/* 라이브 미리보기 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">라이브 미리보기</h2>

        <LivePreview label="기본 탭바 (medium)">
          <div style={{ width: '100%' }}>
            <PreviewTabBar tabs={DEMO_TABS} size="medium" />
          </div>
        </LivePreview>

        <div className="mt-4">
          <LivePreview label="Small 사이즈">
            <div style={{ width: '100%' }}>
              <PreviewTabBar tabs={DEMO_TABS} size="small" />
            </div>
          </LivePreview>
        </div>

        <div className="mt-4">
          <LivePreview label="뱃지 + 비활성">
            <div style={{ width: '100%' }}>
              <PreviewTabBar tabs={BADGE_TABS} size="medium" />
            </div>
          </LivePreview>
        </div>
      </section>

      {/* Props 테이블 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Props</h2>
        <PropsTable props={TABBAR_META.props} />
      </section>

      {/* 코드 예시 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">코드 예시</h2>
        <div className="flex gap-1 border-b border-gray-200 mb-3">
          {Object.keys(TABBAR_META.usageExamples).map((key) => (
            <button
              key={key}
              onClick={() => setExampleTab(key as ExampleTab)}
              className={`px-4 py-1.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                exampleTab === key
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <CodeBlock code={TABBAR_META.usageExamples[exampleTab]} />
      </section>

      {/* 안티패턴 */}
      {TABBAR_META.antiPatterns && (
        <section>
          <AntiPatternBlock patterns={TABBAR_META.antiPatterns} />
        </section>
      )}
      {/* Design Check */}
      <DesignCheckSection component="TabBar" platform={platform} />
      </>
      )}
    </div>
  );
}

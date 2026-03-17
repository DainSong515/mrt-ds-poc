import React, { useState } from 'react';
import { PropsTable } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';
import { AntiPatternBlock } from '../../components/AntiPatternBlock';
import { LivePreview } from '../../components/LivePreview';
import { FigmaLink } from '../../components/FigmaLink';
import { PlatformTabs } from '../../components/PlatformTabs';
import { IOSSection } from '../../components/iOSSection';
import { DesignCheckSection } from '../../components/DesignCheckSection';
import { BUTTON_META } from '../../data/components';
import buttonComponent from '@tokens/component/button.component.json';

const VARIANTS = ['primary', 'primaryOpt', 'secondary', 'secondaryOpt', 'tertiary', 'tertiaryOpt', 'text'] as const;
const SIZES = ['large', 'medium', 'small', 'xSmall'] as const;

type Variant = typeof VARIANTS[number];
type Size = typeof SIZES[number];

// 버튼 스타일 (토큰 기반)
const BUTTON_COLORS = {
  gray: { 50: '#f8f9fa', 80: '#f1f3f5', 100: '#e9ecef', 300: '#ced4da', 700: '#495056', 1000: '#141719' },
  blue: { 100: '#cbe7fd', 500: '#2b96ed' },
  white: '#FFFFFF',
} as const;

const VARIANT_STYLE: Record<Variant, React.CSSProperties> = {
  primary: { background: BUTTON_COLORS.gray[1000], color: BUTTON_COLORS.white, border: 'none' },
  primaryOpt: { background: BUTTON_COLORS.blue[500], color: BUTTON_COLORS.white, border: 'none' },
  secondary: { background: BUTTON_COLORS.gray[80], color: BUTTON_COLORS.gray[1000], border: 'none' },
  secondaryOpt: { background: BUTTON_COLORS.white, color: BUTTON_COLORS.gray[1000], border: 'none' },
  tertiary: { background: BUTTON_COLORS.white, color: BUTTON_COLORS.gray[700], border: `1px solid ${BUTTON_COLORS.gray[100]}` },
  tertiaryOpt: { background: BUTTON_COLORS.white, color: BUTTON_COLORS.gray[700], border: 'none' },
  text: { background: 'transparent', color: BUTTON_COLORS.gray[1000], border: 'none', textDecoration: 'underline' },
};

const SIZE_STYLE: Record<Size, React.CSSProperties & { fontSize: string }> = {
  large: { height: '56px', padding: '0 20px', fontSize: '18px' },
  medium: { height: '48px', padding: '0 16px', fontSize: '16px' },
  small: { height: '40px', padding: '0 12px', fontSize: '14px' },
  xSmall: { height: '36px', padding: '0 10px', fontSize: '14px' },
};

function PreviewButton({ variant, size = 'medium', disabled = false, loading = false, children }: {
  variant: Variant; size?: Size; disabled?: boolean; loading?: boolean; children?: React.ReactNode;
}) {
  const disabledStyle: React.CSSProperties = disabled ? { background: BUTTON_COLORS.gray[50], color: BUTTON_COLORS.gray[300], border: 'none' } : {};
  return (
    <button
      style={{
        borderRadius: '99px',
        fontWeight: 600,
        fontFamily: 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        ...VARIANT_STYLE[variant],
        ...SIZE_STYLE[size],
        ...(disabled ? disabledStyle : {}),
      }}
      disabled={disabled || loading}
    >
      {loading && <span style={{ opacity: 0.7 }}>⟳</span>}
      {children ?? variant}
    </button>
  );
}

// 컴포넌트 토큰 테이블 생성
function parseButtonTokens() {
  const tokens = (buttonComponent as any).button;
  const rows: { variant: string; token: string; value: string; description: string }[] = [];
  for (const [variant, entries] of Object.entries(tokens)) {
    if (variant === 'size') continue;
    for (const [tokenKey, tokenVal] of Object.entries(entries as Record<string, any>)) {
      rows.push({ variant, token: tokenKey, value: tokenVal.$value, description: tokenVal.$description ?? '' });
    }
  }
  return rows;
}

type ExampleTab = keyof typeof BUTTON_META.usageExamples;

export default function ButtonPage() {
  const [exampleTab, setExampleTab] = useState<ExampleTab>('기본');
  const [previewSize, setPreviewSize] = useState<Size>('medium');
  const [previewDisabled, setPreviewDisabled] = useState(false);
  const [platform, setPlatform] = useState<'web' | 'ios'>('web');
  const tokenRows = parseButtonTokens();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Button</h1>
        <p className="mt-2 text-gray-500">{BUTTON_META.description}</p>
        {BUTTON_META.figmaUrl && <div><FigmaLink url={BUTTON_META.figmaUrl} /></div>}
      </div>

      <PlatformTabs platform={platform} onChange={setPlatform} />

      {platform === 'ios' && BUTTON_META.ios ? (
        <IOSSection ios={BUTTON_META.ios} />
      ) : (
      <>
      <div>
        <code className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
          import {'{ Button }'} from '{BUTTON_META.importPath}'
        </code>
      </div>

      {/* 인터랙티브 미리보기 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">라이브 미리보기</h2>
        <div className="flex flex-wrap gap-4 items-center mb-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span>크기</span>
            <select
              value={previewSize}
              onChange={(e) => setPreviewSize(e.target.value as Size)}
              className="border border-gray-200 rounded px-2 py-1 text-xs"
            >
              {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={previewDisabled} onChange={(e) => setPreviewDisabled(e.target.checked)} />
            <span>disabled</span>
          </label>
        </div>
        <LivePreview label="Variant 갤러리">
          {VARIANTS.map((v) => (
            <PreviewButton key={v} variant={v} size={previewSize} disabled={previewDisabled} />
          ))}
        </LivePreview>
      </section>

      {/* Props 테이블 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Props</h2>
        <PropsTable props={BUTTON_META.props} />
      </section>

      {/* 코드 예시 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">코드 예시</h2>
        <div className="flex gap-1 border-b border-gray-200 mb-3">
          {Object.keys(BUTTON_META.usageExamples).map((key) => (
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
        <CodeBlock code={BUTTON_META.usageExamples[exampleTab]} />
      </section>

      {/* 안티패턴 */}
      {BUTTON_META.antiPatterns && (
        <section>
          <AntiPatternBlock patterns={BUTTON_META.antiPatterns} />
        </section>
      )}

      {/* 컴포넌트 토큰 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">컴포넌트 토큰</h2>
        <p className="text-sm text-gray-500 mb-3">button.component.json에서 정의된 토큰</p>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Variant</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Token</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Value</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">설명</th>
              </tr>
            </thead>
            <tbody>
              {tokenRows.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <code className="text-blue-600 font-mono">{row.variant}</code>
                  </td>
                  <td className="px-4 py-2">
                    <code className="text-purple-600 font-mono">{row.token}</code>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      {row.value.startsWith('#') || row.value.startsWith('rgb') ? (
                        <span className="inline-block w-4 h-4 rounded border border-gray-200" style={{ background: row.value }} />
                      ) : null}
                      <code className="text-gray-600 font-mono">{row.value}</code>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-500">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Design Check */}
      <DesignCheckSection component="Button" platform={platform} />
      </>
      )}
    </div>
  );
}

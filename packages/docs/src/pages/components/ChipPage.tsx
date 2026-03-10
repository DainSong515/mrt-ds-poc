import React, { useState } from 'react';
import { PropsTable } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';
import { AntiPatternBlock } from '../../components/AntiPatternBlock';
import { LivePreview } from '../../components/LivePreview';
import { CHIP_META } from '../../data/components';

type ExampleTab = keyof typeof CHIP_META.usageExamples;

// 간단한 Chip 프리뷰 구현
function ChipPreview({ label, selected, disabled, onClick }: {
  label: string; selected: boolean; disabled?: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: `1.5px solid ${selected ? '#141719' : '#e9ecef'}`,
        background: selected ? '#141719' : '#ffffff',
        color: disabled ? '#ced4da' : selected ? '#ffffff' : '#141719',
        borderRadius: '99px',
        padding: '0 14px',
        height: '36px',
        fontSize: '14px',
        fontWeight: selected ? 600 : 400,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  );
}

const FILTER_OPTIONS = ['전체', '항공', '호텔', '투어', '렌터카'];

export default function ChipPage() {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [exampleTab, setExampleTab] = useState<ExampleTab>('기본');

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chip</h1>
        <p className="mt-2 text-gray-500">{CHIP_META.description}</p>
        <code className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
          import {'{ Chip, ChipGroup }'} from '{CHIP_META.importPath}'
        </code>
      </div>

      {/* 라이브 미리보기 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">라이브 미리보기</h2>
        <LivePreview label="필터 칩 그룹">
          {FILTER_OPTIONS.map((opt) => (
            <ChipPreview
              key={opt}
              label={opt}
              selected={selectedFilter === opt}
              onClick={() => setSelectedFilter(opt)}
            />
          ))}
        </LivePreview>
        <p className="text-xs text-gray-400 mt-2">클릭하여 선택 상태를 토글해보세요.</p>

        <div className="mt-4">
          <LivePreview label="비활성 상태">
            <ChipPreview label="비활성" selected={false} disabled onClick={() => {}} />
            <ChipPreview label="선택+비활성" selected disabled onClick={() => {}} />
          </LivePreview>
        </div>
      </section>

      {/* Props 테이블 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Props</h2>
        <PropsTable props={CHIP_META.props} />
      </section>

      {/* 코드 예시 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">코드 예시</h2>
        <div className="flex gap-1 border-b border-gray-200 mb-3">
          {Object.keys(CHIP_META.usageExamples).map((key) => (
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
        <CodeBlock code={CHIP_META.usageExamples[exampleTab]} />
      </section>

      {/* 안티패턴 */}
      {CHIP_META.antiPatterns && (
        <section>
          <AntiPatternBlock patterns={CHIP_META.antiPatterns} />
        </section>
      )}
    </div>
  );
}

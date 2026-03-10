import React, { useState } from 'react';
import { PropsTable } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';
import { AntiPatternBlock } from '../../components/AntiPatternBlock';
import { ICON_META, ICON_CATEGORIES } from '../../data/components';

const CATEGORY_LABELS: Record<string, string> = {
  navigation: '네비게이션',
  action: '액션',
  content: '콘텐츠',
  communication: '커뮤니케이션',
  travel: '여행',
  ui: 'UI',
};

type ExampleTab = keyof typeof ICON_META.usageExamples;

export default function IconPage() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [exampleTab, setExampleTab] = useState<ExampleTab>('기본');

  const allIcons = Object.values(ICON_CATEGORIES).flat();
  const filteredAll = search
    ? allIcons.filter((name) => name.toLowerCase().includes(search.toLowerCase()))
    : null;

  function handleCopyName(name: string) {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  }

  function IconChip({ name }: { name: string }) {
    const isCopied = copied === name;
    return (
      <button
        onClick={() => handleCopyName(name)}
        title="클릭하여 이름 복사"
        className={`flex flex-col items-center p-2 rounded-lg border text-center transition-all hover:border-blue-300 hover:bg-blue-50 ${
          isCopied ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'
        }`}
      >
        {/* 아이콘 자리 (실제 SVG 대신 이름 이니셜 표시) */}
        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded mb-1 text-xs font-bold text-gray-500">
          {name.replace('Ico', '').charAt(0)}
        </div>
        <span className="text-xs font-mono text-gray-600 truncate w-full" style={{ fontSize: '10px' }}>
          {isCopied ? '복사됨!' : name}
        </span>
      </button>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Icon</h1>
        <p className="mt-2 text-gray-500">{ICON_META.description}</p>
        <code className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
          import {'{ Icon }'} from '{ICON_META.importPath}'
        </code>
      </div>

      {/* 네이밍 규칙 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-800 mb-1">네이밍 규칙</p>
        <p className="text-sm text-blue-700 font-mono">Ico + PascalCase</p>
        <p className="text-sm text-blue-700 mt-1">예: IcoArrowLeft, IcoSearch, IcoHeart</p>
      </div>

      {/* 검색 */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="아이콘 검색 (예: Arrow, Heart, Search)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-sm text-gray-400 hover:text-gray-600">
              초기화
            </button>
          )}
        </div>

        {filteredAll ? (
          <div>
            <p className="text-sm text-gray-500 mb-3">{filteredAll.length}개 결과</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {filteredAll.map((name) => <IconChip key={name} name={name} />)}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(ICON_CATEGORIES).map(([cat, icons]) => (
              <div key={cat}>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">{CATEGORY_LABELS[cat] ?? cat} ({icons.length})</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {icons.map((name) => <IconChip key={name} name={name} />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Props 테이블 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Props</h2>
        <PropsTable props={ICON_META.props} />
      </section>

      {/* 코드 예시 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">코드 예시</h2>
        <div className="flex gap-1 border-b border-gray-200 mb-3">
          {Object.keys(ICON_META.usageExamples).map((key) => (
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
        <CodeBlock code={ICON_META.usageExamples[exampleTab]} />
      </section>

      {/* 안티패턴 */}
      {ICON_META.antiPatterns && (
        <section>
          <AntiPatternBlock patterns={ICON_META.antiPatterns} />
        </section>
      )}
    </div>
  );
}

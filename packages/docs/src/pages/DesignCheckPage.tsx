import React, { useState, useMemo } from 'react';
import { PlatformTabs } from '../components/PlatformTabs';
import resultData from '../data/design-check-results.json';

interface CheckItem {
  category: string;
  property: string;
  figmaValue: string;
  figmaToken?: string;
  codeValue: string;
  codeToken?: string;
  status: 'match' | 'mismatch' | 'missing';
}

interface DesignCheckResult {
  component: string;
  platform: 'web' | 'ios';
  variant?: string;
  size?: string;
  timestamp: string;
  figmaNodeId: string;
  summary: {
    total: number;
    match: number;
    mismatch: number;
    matchRate: number;
  };
  items: CheckItem[];
}

const COMPONENTS = ['Button', 'Chip', 'TabBar', 'Text', 'Icon', 'Color', 'Typography'];

function StatusBadge({ status }: { status: CheckItem['status'] }) {
  if (status === 'match') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
        Match
      </span>
    );
  }
  if (status === 'mismatch') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
        Diff
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-full">
      Missing
    </span>
  );
}

function ColorPreview({ value }: { value: string }) {
  if (!/^#[0-9a-fA-F]{3,8}$/.test(value)) return null;
  return (
    <span
      className="inline-block w-3.5 h-3.5 rounded border border-gray-300 align-middle mr-1"
      style={{ backgroundColor: value }}
    />
  );
}

function ProgressBar({ rate }: { rate: number }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${
          rate >= 90 ? 'bg-green-500' : rate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
        }`}
        style={{ width: `${Math.min(rate, 100)}%` }}
      />
    </div>
  );
}

function ResultTable({ items }: { items: CheckItem[] }) {
  const grouped = useMemo(() => {
    const map = new Map<string, CheckItem[]>();
    for (const item of items) {
      const list = map.get(item.category) || [];
      list.push(item);
      map.set(item.category, list);
    }
    return map;
  }, [items]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700 w-28">Category</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700 w-36">Property</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Figma</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Code</th>
            <th className="text-center px-4 py-2.5 font-semibold text-gray-700 w-24">Status</th>
          </tr>
        </thead>
        <tbody>
          {[...grouped.entries()].map(([category, categoryItems]) =>
            categoryItems.map((item, idx) => (
              <tr
                key={`${category}-${item.property}`}
                className={`border-b border-gray-100 last:border-0 ${
                  item.status === 'mismatch' ? 'bg-red-50/40' : item.status === 'missing' ? 'bg-yellow-50/40' : ''
                }`}
              >
                {idx === 0 ? (
                  <td className="px-4 py-2.5 font-medium text-gray-600" rowSpan={categoryItems.length}>
                    {category}
                  </td>
                ) : null}
                <td className="px-4 py-2.5 font-mono text-xs text-gray-700">{item.property}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-1">
                    <ColorPreview value={item.figmaValue} />
                    <code className="text-xs text-gray-700">{item.figmaValue}</code>
                  </div>
                  {item.figmaToken && (
                    <div className="text-xs text-gray-400 mt-0.5">{item.figmaToken}</div>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  {item.status === 'missing' ? (
                    <span className="text-xs text-gray-400 italic">not found</span>
                  ) : (
                    <>
                      <div className="flex items-center gap-1">
                        <ColorPreview value={item.codeValue} />
                        <code className="text-xs text-gray-700">{item.codeValue}</code>
                      </div>
                      {item.codeToken && (
                        <div className="text-xs text-gray-400 mt-0.5">{item.codeToken}</div>
                      )}
                    </>
                  )}
                </td>
                <td className="px-4 py-2.5 text-center">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 text-gray-400">
      <div className="text-4xl mb-4">{"{ }"}</div>
      <p className="text-lg font-medium text-gray-500 mb-2">아직 비교 결과가 없습니다</p>
      <p className="text-sm max-w-md mx-auto">
        Claude Code에서 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">/design-check</code> 스킬을
        실행하면 Figma 디자인과 코드 구현의 비교 결과가 여기에 표시됩니다.
      </p>
      <div className="mt-6 bg-gray-900 rounded-lg p-4 max-w-lg mx-auto text-left">
        <p className="text-xs text-gray-500 mb-1">Example</p>
        <code className="text-sm text-gray-300">
          /design-check https://figma.com/design/... Button --platform both
        </code>
      </div>
    </div>
  );
}

export default function DesignCheckPage() {
  const results = resultData.results as DesignCheckResult[];
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [platform, setPlatform] = useState<'web' | 'ios'>('web');

  const componentNames = useMemo(() => {
    const names = new Set(results.map((r) => r.component));
    return COMPONENTS.filter((c) => names.has(c));
  }, [results]);

  const activeComponent = selectedComponent || componentNames[0] || null;

  const filteredResults = useMemo(
    () => results.filter((r) => r.component === activeComponent && r.platform === platform),
    [results, activeComponent, platform],
  );

  const overallSummary = useMemo(() => {
    if (!activeComponent) return null;
    const componentResults = results.filter((r) => r.component === activeComponent);
    const total = componentResults.reduce((s, r) => s + r.summary.total, 0);
    const match = componentResults.reduce((s, r) => s + r.summary.match, 0);
    return { total, match, mismatch: total - match, matchRate: total > 0 ? Math.round((match / total) * 1000) / 10 : 0 };
  }, [results, activeComponent]);

  const lastChecked = useMemo(() => {
    if (!activeComponent) return null;
    const timestamps = results.filter((r) => r.component === activeComponent).map((r) => r.timestamp);
    if (timestamps.length === 0) return null;
    return new Date(Math.max(...timestamps.map((t) => new Date(t).getTime()))).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }, [results, activeComponent]);

  if (results.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Design Check</h1>
          <p className="text-gray-500">Figma 디자인과 코드 구현의 일치 여부를 확인합니다</p>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Design Check</h1>
        <p className="text-gray-500">Figma 디자인과 코드 구현의 일치 여부를 확인합니다</p>
      </div>

      {/* Component Filter */}
      <div className="flex flex-wrap gap-2">
        {componentNames.map((name) => (
          <button
            key={name}
            onClick={() => setSelectedComponent(name)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activeComponent === name
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {activeComponent && overallSummary && (
        <>
          {/* Summary Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{activeComponent}</h2>
                {lastChecked && (
                  <p className="text-xs text-gray-400 mt-0.5">Last checked: {lastChecked}</p>
                )}
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${
                  overallSummary.matchRate >= 90 ? 'text-green-600' : overallSummary.matchRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {overallSummary.matchRate}%
                </span>
              </div>
            </div>
            <ProgressBar rate={overallSummary.matchRate} />
            <div className="flex gap-4 mt-3 text-sm">
              <span className="text-gray-500">
                <span className="font-semibold text-gray-700">{overallSummary.total}</span> checked
              </span>
              <span className="text-green-600">
                <span className="font-semibold">{overallSummary.match}</span> match
              </span>
              <span className="text-red-600">
                <span className="font-semibold">{overallSummary.mismatch}</span> mismatch
              </span>
            </div>
          </div>

          {/* Platform Tabs */}
          <PlatformTabs platform={platform} onChange={setPlatform} />

          {/* Results */}
          {filteredResults.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">
              {activeComponent}의 {platform === 'web' ? 'Web' : 'iOS'} 비교 결과가 없습니다.
            </div>
          ) : (
            filteredResults.map((result) => (
              <div key={`${result.component}-${result.platform}-${result.variant || ''}-${result.size || ''}`} className="space-y-3">
                {(result.variant || result.size) && (
                  <div className="flex items-center gap-2">
                    {result.variant && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        {result.variant}
                      </span>
                    )}
                    {result.size && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                        {result.size}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {result.summary.match}/{result.summary.total} match ({result.summary.matchRate}%)
                    </span>
                  </div>
                )}
                <ResultTable items={result.items} />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

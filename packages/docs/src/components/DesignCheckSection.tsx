import React, { useMemo, useState } from 'react';
import resultData from '../data/design-check-results.json';
import { findSyncMapping, buildSyncInfo, type SyncInfo } from '../data/sync-mappings';
import { SyncActionPanel } from './SyncActionPanel';
import { CreateFixPRButton } from './CreateFixPRButton';

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

function StatusBadge({ status }: { status: CheckItem['status'] }) {
  if (status === 'match') {
    return <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Match</span>;
  }
  if (status === 'mismatch') {
    return <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-full">Diff</span>;
  }
  return <span className="text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-full">Missing</span>;
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

function FixButton({ item, component, platform }: { item: CheckItem; component: string; platform: 'web' | 'ios' }) {
  const [open, setOpen] = useState(false);
  const mapping = findSyncMapping(item.codeToken, item.property, platform);
  if (!mapping || item.status !== 'mismatch') return null;

  const syncInfo = buildSyncInfo(mapping, item.property, item.codeToken || '', item.codeValue, item.figmaValue, component);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="text-xs font-medium text-blue-600 hover:text-blue-800 px-1.5 py-0.5 rounded hover:bg-blue-50 transition-colors"
      >
        Fix {open ? '\u25B2' : '\u25BC'}
      </button>
      {open && <SyncActionPanel syncInfo={syncInfo} platform={platform} />}
    </div>
  );
}

function ResultTable({ items, component, platform }: { items: CheckItem[]; component: string; platform: 'web' | 'ios' }) {
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
                  {item.figmaToken && <div className="text-xs text-gray-400 mt-0.5">{item.figmaToken}</div>}
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
                      {item.codeToken && <div className="text-xs text-gray-400 mt-0.5">{item.codeToken}</div>}
                    </>
                  )}
                </td>
                <td className="px-4 py-2.5 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <StatusBadge status={item.status} />
                    {item.status === 'mismatch' && (
                      <FixButton item={item} component={component} platform={platform} />
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

interface MergedRow {
  category: string;
  property: string;
  figmaValue: string;
  figmaToken?: string;
  web?: CheckItem;
  ios?: CheckItem;
}

function ValueCell({ item, component, platform }: { item?: CheckItem; component: string; platform: 'web' | 'ios' }) {
  if (!item) {
    return <span className="text-xs text-gray-300 italic">-</span>;
  }
  if (item.status === 'missing') {
    return <span className="text-xs text-gray-400 italic">not found</span>;
  }
  const isMatch = item.status === 'match';
  return (
    <div>
      <div className="flex items-center gap-1">
        <ColorPreview value={item.codeValue} />
        <code className={`text-xs ${isMatch ? 'text-green-700' : 'text-red-700'}`}>{item.codeValue}</code>
        {isMatch
          ? <span className="text-green-500 text-xs ml-0.5">✓</span>
          : <span className="text-red-500 text-xs ml-0.5">✗</span>
        }
      </div>
      {item.codeToken && <div className="text-xs text-gray-400 mt-0.5">{item.codeToken}</div>}
      {item.status === 'mismatch' && (
        <FixButton item={item} component={component} platform={platform} />
      )}
    </div>
  );
}

function CombinedResultTable({ webItems, iosItems, component }: { webItems: CheckItem[]; iosItems: CheckItem[]; component: string }) {
  const rows = useMemo(() => {
    const map = new Map<string, MergedRow>();

    for (const item of webItems) {
      const key = `${item.category}::${item.property}`;
      const existing = map.get(key) || { category: item.category, property: item.property, figmaValue: item.figmaValue, figmaToken: item.figmaToken };
      existing.web = item;
      map.set(key, existing);
    }
    for (const item of iosItems) {
      const key = `${item.category}::${item.property}`;
      const existing = map.get(key) || { category: item.category, property: item.property, figmaValue: item.figmaValue, figmaToken: item.figmaToken };
      existing.ios = item;
      if (!existing.figmaToken && item.figmaToken) existing.figmaToken = item.figmaToken;
      map.set(key, existing);
    }

    return [...map.values()];
  }, [webItems, iosItems]);

  const grouped = useMemo(() => {
    const map = new Map<string, MergedRow[]>();
    for (const row of rows) {
      const list = map.get(row.category) || [];
      list.push(row);
      map.set(row.category, list);
    }
    return map;
  }, [rows]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700 w-28">Category</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700 w-36">Property</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Figma</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400" />Web
              </span>
            </th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" />iOS
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...grouped.entries()].map(([category, categoryRows]) =>
            categoryRows.map((row, idx) => {
              const hasAnyMismatch = row.web?.status === 'mismatch' || row.ios?.status === 'mismatch';
              const hasAnyMissing = row.web?.status === 'missing' || row.ios?.status === 'missing';
              return (
                <tr
                  key={`${category}-${row.property}`}
                  className={`border-b border-gray-100 last:border-0 ${
                    hasAnyMismatch ? 'bg-red-50/40' : hasAnyMissing ? 'bg-yellow-50/40' : ''
                  }`}
                >
                  {idx === 0 ? (
                    <td className="px-4 py-2.5 font-medium text-gray-600" rowSpan={categoryRows.length}>
                      {category}
                    </td>
                  ) : null}
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-700">{row.property}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <ColorPreview value={row.figmaValue} />
                      <code className="text-xs text-gray-700">{row.figmaValue}</code>
                    </div>
                    {row.figmaToken && <div className="text-xs text-gray-400 mt-0.5">{row.figmaToken}</div>}
                  </td>
                  <td className="px-4 py-2.5">
                    <ValueCell item={row.web} component={component} platform="web" />
                  </td>
                  <td className="px-4 py-2.5">
                    <ValueCell item={row.ios} component={component} platform="ios" />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

function CombinedView({ results, component }: { results: DesignCheckResult[]; component: string }) {
  const webResults = results.filter((r) => r.platform === 'web');
  const iosResults = results.filter((r) => r.platform === 'ios');
  const webItems = webResults.flatMap((r) => r.items);
  const iosItems = iosResults.flatMap((r) => r.items);

  const webSummary = webResults.reduce((s, r) => ({ match: s.match + r.summary.match, total: s.total + r.summary.total }), { match: 0, total: 0 });
  const iosSummary = iosResults.reduce((s, r) => ({ match: s.match + r.summary.match, total: s.total + r.summary.total }), { match: 0, total: 0 });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 text-xs text-gray-500">
        {webSummary.total > 0 && (
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Web {webSummary.match}/{webSummary.total}
          </span>
        )}
        {iosSummary.total > 0 && (
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            iOS {iosSummary.match}/{iosSummary.total}
          </span>
        )}
      </div>
      <CombinedResultTable webItems={webItems} iosItems={iosItems} component={component} />
    </div>
  );
}

export function DesignCheckSection({ component, platform }: { component: string; platform?: 'web' | 'ios' }) {
  const results = resultData.results as DesignCheckResult[];
  const showAll = platform === undefined;

  const filtered = useMemo(
    () => showAll
      ? results.filter((r) => r.component === component)
      : results.filter((r) => r.component === component && r.platform === platform),
    [results, component, platform, showAll],
  );

  const overall = useMemo(() => {
    const all = results.filter((r) => r.component === component);
    const total = all.reduce((s, r) => s + r.summary.total, 0);
    const match = all.reduce((s, r) => s + r.summary.match, 0);
    return { total, match, matchRate: total > 0 ? Math.round((match / total) * 1000) / 10 : 0 };
  }, [results, component]);

  const lastChecked = useMemo(() => {
    const timestamps = results.filter((r) => r.component === component).map((r) => r.timestamp);
    if (timestamps.length === 0) return null;
    return new Date(Math.max(...timestamps.map((t) => new Date(t).getTime()))).toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
    });
  }, [results, component]);

  if (results.filter((r) => r.component === component).length === 0) {
    return (
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Design Check</h2>
        <div className="border border-dashed border-gray-200 rounded-lg p-6 text-center text-sm text-gray-400">
          <p>아직 비교 결과가 없습니다.</p>
          <p className="mt-1">
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
              /design-check &lt;figma-url&gt; {component}
            </code>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-800 mb-3">Design Check</h2>

      {/* Summary bar */}
      <div className="flex items-center gap-4 mb-4 bg-white border border-gray-200 rounded-lg px-4 py-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1.5">
            <span className={`text-lg font-bold ${
              overall.matchRate >= 90 ? 'text-green-600' : overall.matchRate >= 70 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {overall.matchRate}%
            </span>
            <span className="text-xs text-gray-400">
              {overall.match}/{overall.total} match
            </span>
            {lastChecked && <span className="text-xs text-gray-400">| {lastChecked}</span>}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                overall.matchRate >= 90 ? 'bg-green-500' : overall.matchRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(overall.matchRate, 100)}%` }}
            />
          </div>
        </div>
        <CreateFixPRButton component={component} results={filtered} />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-6 text-gray-400 text-sm border border-dashed border-gray-200 rounded-lg">
          {platform ? (platform === 'web' ? 'Web' : 'iOS') : ''} 비교 결과가 없습니다.
        </div>
      ) : showAll ? (
        <CombinedView results={filtered} component={component} />
      ) : (
        <div className="space-y-4">
          {filtered.map((result) => (
            <div key={`${result.platform}-${result.variant || ''}-${result.size || ''}`}>
              {result.variant && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                    {result.variant}
                  </span>
                  {result.size && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                      {result.size}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {result.summary.match}/{result.summary.total} ({result.summary.matchRate}%)
                  </span>
                </div>
              )}
              <ResultTable items={result.items} component={component} platform={result.platform} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { buildProgressBoard, getOverallStats, type ImplementationStatus } from '../data/progress-board';

function StatusIcon({ status, matchRate }: { status: ImplementationStatus; matchRate?: number }) {
  switch (status) {
    case 'done':
      return (
        <span className="inline-flex items-center gap-1.5 text-green-700">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          {matchRate !== undefined ? `${matchRate}%` : 'Done'}
        </span>
      );
    case 'in-progress':
      return (
        <span className="inline-flex items-center gap-1.5 text-yellow-700">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 relative">
            <span className="absolute inset-0 rounded-full bg-white" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </span>
          {matchRate !== undefined ? `${matchRate}%` : 'In Progress'}
        </span>
      );
    case 'not-ready':
      return (
        <span className="inline-flex items-center gap-1.5 text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-gray-300" />
          {matchRate !== undefined ? `${matchRate}%` : 'Not Ready'}
        </span>
      );
    case 'not-planned':
      return (
        <span className="inline-flex items-center gap-1 text-gray-400">
          <span className="text-xs">—</span> N/A
        </span>
      );
  }
}

function SummaryCard({ label, done, total, pct, color }: { label: string; done: number; total: number; pct: number; color: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1 min-w-0">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="flex items-end gap-2">
        <span className={`text-2xl font-bold ${color}`}>{pct}%</span>
        <span className="text-sm text-gray-400 pb-0.5">{done}/{total}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${pct >= 90 ? 'bg-green-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function ProgressBoardPage() {
  const entries = useMemo(() => buildProgressBoard(), []);
  const stats = useMemo(() => getOverallStats(entries), [entries]);
  const components = entries.filter((e) => e.category === 'component');
  const tokens = entries.filter((e) => e.category === 'token');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Progress Board</h1>
        <p className="text-sm text-gray-500">Figma 기준 플랫폼별 구현 현황. matchRate는 design-check-results.json에서 자동 반영됩니다.</p>
      </div>

      {/* Summary Cards */}
      <div className="flex gap-3">
        <SummaryCard
          label="Figma"
          done={stats.figma.done}
          total={stats.figma.total}
          pct={stats.figma.pct}
          color="text-green-600"
        />
        <SummaryCard
          label="Web"
          done={stats.web.done}
          total={stats.web.total}
          pct={stats.web.pct}
          color={stats.web.pct >= 90 ? 'text-green-600' : stats.web.pct >= 70 ? 'text-yellow-600' : 'text-red-600'}
        />
        <SummaryCard
          label="iOS"
          done={stats.ios.done}
          total={stats.ios.total}
          pct={stats.ios.pct}
          color={stats.ios.pct >= 90 ? 'text-green-600' : stats.ios.pct >= 70 ? 'text-yellow-600' : 'text-red-600'}
        />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Done</span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500 relative">
            <span className="absolute inset-0 rounded-full bg-white" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </span>
          In Progress
        </span>
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full border-2 border-gray-300" /> Not Ready</span>
        <span className="inline-flex items-center gap-1"><span className="text-gray-400">—</span> N/A</span>
      </div>

      {/* Components Table */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Components</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700 w-36">Component</th>
                <th className="text-center px-4 py-2.5 font-semibold text-gray-700 w-24">Figma</th>
                <th className="text-center px-4 py-2.5 font-semibold text-gray-700">Web</th>
                <th className="text-center px-4 py-2.5 font-semibold text-gray-700">iOS</th>
              </tr>
            </thead>
            <tbody>
              {components.map((entry) => (
                <tr key={entry.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-2.5">
                    <Link to={entry.href} className="font-medium text-blue-600 hover:underline">
                      {entry.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <StatusIcon status="done" />
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <Link to={`${entry.href}#design-check`} className="hover:underline">
                      <StatusIcon
                        status={entry.platforms.web.status}
                        matchRate={entry.platforms.web.matchRate}
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {entry.platforms.ios.status !== 'not-planned' ? (
                      <Link to={`${entry.href}#design-check`} className="hover:underline">
                        <StatusIcon
                          status={entry.platforms.ios.status}
                          matchRate={entry.platforms.ios.matchRate}
                        />
                      </Link>
                    ) : (
                      <StatusIcon status={entry.platforms.ios.status} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tokens Table */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tokens</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700 w-36">Token</th>
                <th className="text-center px-4 py-2.5 font-semibold text-gray-700 w-24">Figma</th>
                <th className="text-center px-4 py-2.5 font-semibold text-gray-700">Web</th>
                <th className="text-center px-4 py-2.5 font-semibold text-gray-700">iOS</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((entry) => (
                <tr key={entry.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-2.5">
                    <Link to={entry.href} className="font-medium text-blue-600 hover:underline">
                      {entry.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <StatusIcon status="done" />
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <Link to={`${entry.href}#design-check`} className="hover:underline">
                      <StatusIcon
                        status={entry.platforms.web.status}
                        matchRate={entry.platforms.web.matchRate}
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {entry.platforms.ios.matchRate !== undefined || entry.platforms.ios.status !== 'not-ready' ? (
                      <Link to={`${entry.href}#design-check`} className="hover:underline">
                        <StatusIcon
                          status={entry.platforms.ios.status}
                          matchRate={entry.platforms.ios.matchRate}
                        />
                      </Link>
                    ) : (
                      <StatusIcon status={entry.platforms.ios.status} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

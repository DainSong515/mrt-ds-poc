import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { buildProgressBoard, getOverallStats, type ImplementationStatus } from '../data/progress-board';

const COMPONENTS = [
  { name: 'Button', href: '/components/button', desc: '7가지 variant, 4가지 size. 메인 CTA부터 텍스트 링크까지.', count: '7 variants' },
  { name: 'Text', href: '/components/text', desc: '타이포그래피 시스템. display/headline/paragraph/caption 4계층.', count: '60+ variants' },
  { name: 'Icon', href: '/components/icon', desc: '247개 아이콘. Ico + PascalCase 네이밍. 6개 카테고리.', count: '247 icons' },
  { name: 'Chip', href: '/components/chip', desc: '필터, 태그, 카테고리 선택 칩. 선택/비활성 상태 지원.', count: '2 states' },
];

function ProgressMiniStatus({ status, matchRate }: { status: ImplementationStatus; matchRate?: number }) {
  if (status === 'done') return <span className="text-green-600 font-medium">{matchRate !== undefined ? `${matchRate}%` : 'Done'}</span>;
  if (status === 'in-progress') return <span className="text-yellow-600 font-medium">{matchRate !== undefined ? `${matchRate}%` : 'WIP'}</span>;
  if (status === 'not-ready') return <span className="text-gray-400">{matchRate !== undefined ? `${matchRate}%` : 'Not Ready'}</span>;
  return <span className="text-gray-300">—</span>;
}

const TOKENS = [
  { name: 'Color', href: '/tokens/color', desc: '8개 색상군 스케일 + 4개 시맨틱 그룹 (surface/content/border/interactive)', count: '70+ tokens' },
  { name: 'Typography', href: '/tokens/typography', desc: '4계층 타이포그래피 스케일. fontSize 9px~40px 범위.', count: '60 styles' },
  { name: 'Shadow', href: '/tokens/shadow', desc: 'E100~E500 표준 + E100V~E500V 역방향 엘리베이션.', count: '10 shadows' },
];

export default function OverviewPage() {
  const progressEntries = useMemo(() => buildProgressBoard(), []);
  const stats = useMemo(() => getOverallStats(progressEntries), [progressEntries]);

  return (
    <div className="space-y-12">
      {/* 헤더 */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">MRT Design System</h1>
          <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">v0.2.0</span>
        </div>
        <p className="text-lg text-gray-500 max-w-2xl">
          마이리얼트립 디자인 시스템 PoC. W3C DTCG JSON 토큰 + MCP 서버 기반 AI-native 구조.
        </p>
      </div>

      {/* 특징 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="text-2xl mb-2">🤖</div>
          <h3 className="font-semibold text-gray-800 mb-1">AI-native</h3>
          <p className="text-sm text-gray-500">7개 MCP Tool로 AI 에이전트가 올바른 컴포넌트와 토큰을 즉시 참조</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="text-2xl mb-2">🎨</div>
          <h3 className="font-semibold text-gray-800 mb-1">3계층 토큰</h3>
          <p className="text-sm text-gray-500">Scale → Semantic → Component 계층 구조로 W3C DTCG JSON 준수</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-800 mb-1">타입 안전</h3>
          <p className="text-sm text-gray-500">TypeScript 기반 Props 타입으로 잘못된 variant/typography 방지</p>
        </div>
      </div>

      {/* Progress Board 요약 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Progress Board</h2>
          <Link to="/progress" className="text-sm text-blue-600 hover:underline">전체 보기 &rarr;</Link>
        </div>
        <div className="flex gap-3 mb-4">
          {[
            { label: 'Figma', ...stats.figma },
            { label: 'Web', ...stats.web },
            { label: 'iOS', ...stats.ios },
          ].map((s) => (
            <div key={s.label} className="flex-1 bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{s.label}</div>
              <div className="flex items-end gap-1.5">
                <span className={`text-xl font-bold ${s.pct >= 90 ? 'text-green-600' : s.pct >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {s.pct}%
                </span>
                <span className="text-xs text-gray-400 pb-0.5">{s.done}/{s.total}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Name</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-700 w-20">Figma</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-700 w-24">Web</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-700 w-24">iOS</th>
              </tr>
            </thead>
            <tbody>
              {progressEntries.map((entry) => (
                <tr key={entry.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <Link to={entry.href} className="font-medium text-blue-600 hover:underline text-xs">{entry.name}</Link>
                  </td>
                  <td className="px-4 py-2 text-center text-xs"><span className="text-green-600 font-medium">Done</span></td>
                  <td className="px-4 py-2 text-center text-xs">
                    <ProgressMiniStatus status={entry.platforms.web.status} matchRate={entry.platforms.web.matchRate} />
                  </td>
                  <td className="px-4 py-2 text-center text-xs">
                    <ProgressMiniStatus status={entry.platforms.ios.status} matchRate={entry.platforms.ios.matchRate} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 컴포넌트 */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COMPONENTS.map((c) => (
            <Link
              key={c.name}
              to={c.href}
              className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-400 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{c.name}</h3>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{c.count}</span>
              </div>
              <p className="text-sm text-gray-500">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 토큰 */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Tokens</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TOKENS.map((t) => (
            <Link
              key={t.name}
              to={t.href}
              className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-400 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{t.name}</h3>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t.count}</span>
              </div>
              <p className="text-sm text-gray-500">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* MCP 도구 */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">MCP Tools (v0.3.0)</h2>
        <div className="bg-gray-900 rounded-xl p-5 text-sm font-mono">
          <div className="space-y-1 text-gray-300">
            {[
              ['discover_tools', 'query?, category?', '전체 도구 목록 + 카테고리 (시작점)'],
              ['list_components', 'platform?', '컴포넌트 목록 + 플랫폼 상태'],
              ['get_component', 'name, platform?', '통합 컴포넌트 스펙 (Props, 예시)'],
              ['get_token', 'name', '토큰 이름으로 값 조회'],
              ['get_semantic_token', 'intent', '의도 기반 토큰 (disabled, CTA 등)'],
              ['search_design_system', 'query', 'BM25 자연어 검색'],
              ['get_design_check_status', '', 'Figma-코드 동기화 현황'],
              ['get_design_check_mismatches', 'component, platform?', '불일치 항목 + fix 정보'],
              ['list_icons', 'category?', '카테고리별 아이콘 목록'],
              ['search_icons', 'keyword', '키워드 아이콘 검색 (한글/영문)'],
              ['get_ds_candidates', 'status?', '디자인 시스템 후보군 목록'],
              ['register_ds_candidate', 'id, description, sources', '후보군 등록'],
            ].map(([name, args, desc]) => (
              <div key={name} className="flex gap-3">
                <span className="text-blue-400 shrink-0">{name}</span>
                <span className="text-gray-500">({args})</span>
                <span className="text-gray-400">— {desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

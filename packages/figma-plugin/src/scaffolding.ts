/**
 * 컴포넌트 승인 시 생성할 파일들
 * ui/ 패키지 스캐폴딩 + candidates.ts 업데이트
 */
import { CANDIDATE_REGISTRY } from './candidates';

function toPascalCase(str: string): string {
  return str.split(/[-_]/).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

/** candidates.ts에서 해당 후보군 status를 completed로 변경한 새 내용 */
export function buildCandidatesFileContent(approvedId: string): string {
  const lines = CANDIDATE_REGISTRY.map((c) => {
    if (c.id !== approvedId) return null;
    return { ...c, status: 'completed' as const };
  });

  const updated = CANDIDATE_REGISTRY.map((c) =>
    c.id === approvedId ? { ...c, status: 'completed' as const } : c
  );

  return `/** mcp-server/src/tools/candidates.ts와 동기화 */
export interface DSCandidate {
  id: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  description: string;
  sources: string[];
  similarity: number;
  notes?: string;
}

export const CANDIDATE_REGISTRY: DSCandidate[] = ${JSON.stringify(updated, null, 2)};
`;
}

/** 컴포넌트 types.ts 스캐폴딩 */
function buildTypesFile(componentId: string): string {
  const pascal = toPascalCase(componentId);
  const candidate = CANDIDATE_REGISTRY.find((c) => c.id === componentId);

  return `import type React from 'react';

// TODO: ${candidate?.description ?? componentId} 구현
// 소스 참조: ${candidate?.sources.join(', ') ?? ''}

export const ${pascal.toUpperCase()}_VARIANTS = [
  // TODO: variant 목록 정의
] as const;

export type ${pascal}Variant = (typeof ${pascal.toUpperCase()}_VARIANTS)[number];

export interface ${pascal}Props {
  // TODO: Props 정의
  children?: React.ReactNode;
}
`;
}

/** 컴포넌트 tsx 스캐폴딩 */
function buildComponentFile(componentId: string): string {
  const pascal = toPascalCase(componentId);
  const candidate = CANDIDATE_REGISTRY.find((c) => c.id === componentId);

  return `/**
 * ${pascal} 컴포넌트
 * ${candidate?.description ?? ''}
 *
 * TODO: 구현 필요
 * - Figma 디자인 참조: 🧩 DS Candidates 페이지
 * - 소스 참조: ${candidate?.sources.join(', ') ?? ''}
 */
import React from 'react';
import type { ${pascal}Props } from './${pascal}.types';

export function ${pascal}({
  children,
  ...props
}: ${pascal}Props) {
  // TODO: 구현
  return (
    <div {...props}>
      {children}
    </div>
  );
}

export default ${pascal};
`;
}

/** index.ts 스캐폴딩 */
function buildIndexFile(componentId: string): string {
  const pascal = toPascalCase(componentId);
  return `export { ${pascal}, default } from './${pascal}';
export type { ${pascal}Props } from './${pascal}.types';
`;
}

/** 승인 시 생성할 파일 목록 (base64 인코딩) */
export function buildApproveFiles(candidateId: string): Array<{
  path: string;
  content: string;
}> {
  const pascal = toPascalCase(candidateId);
  const base = `packages/ui/src/components/${pascal}`;

  return [
    // ui/ 컴포넌트 스캐폴딩
    {
      path: `${base}/${pascal}.types.ts`,
      content: toBase64(buildTypesFile(candidateId)),
    },
    {
      path: `${base}/${pascal}.tsx`,
      content: toBase64(buildComponentFile(candidateId)),
    },
    {
      path: `${base}/index.ts`,
      content: toBase64(buildIndexFile(candidateId)),
    },
    // figma-plugin candidates.ts 업데이트
    {
      path: 'packages/figma-plugin/src/candidates.ts',
      content: toBase64(buildCandidatesFileContent(candidateId)),
    },
  ];
}

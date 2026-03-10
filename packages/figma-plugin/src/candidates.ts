/** mcp-server/src/tools/candidates.ts와 동기화 */
export interface DSCandidate {
  id: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  description: string;
  sources: string[];
  similarity: number;
  notes?: string;
}

export const CANDIDATE_REGISTRY: DSCandidate[] = [
  {
    id: 'unified-chip',
    status: 'in-progress',
    sources: ['chip/FilterChip.tsx', 'chip/CategoryChip.tsx', 'chip/TagChip.tsx'],
    similarity: 0.92,
    description: '필터/카테고리/태그 Chip → selected + variant 기반 단일 Chip 컴포넌트',
    notes: 'filled/outlined 2가지 variant, medium/small 2가지 size',
  },
  {
    id: 'unified-badge',
    status: 'in-progress',
    sources: ['badge/StatusBadge.tsx', 'badge/CountBadge.tsx', 'badge/TagBadge.tsx'],
    similarity: 0.88,
    description: '3가지 Badge → variant 기반 단일 Badge 컴포넌트',
  },
  {
    id: 'unified-input',
    status: 'pending',
    sources: ['input/TextInput.tsx', 'input/SearchInput.tsx', 'input/NumberInput.tsx'],
    similarity: 0.83,
    description: '3가지 Input → type prop 기반 단일 Input 컴포넌트',
    notes: 'value, onChange, placeholder, disabled Props 구조 공유',
  },
  {
    id: 'unified-card',
    status: 'pending',
    sources: ['card/ProductCard.tsx', 'card/HotelCard.tsx', 'card/FlightCard.tsx', 'card/ActivityCard.tsx'],
    similarity: 0.76,
    description: '4가지 Card → slot 기반 단일 Card 컴포넌트',
    notes: '공통 구조: 이미지 + 타이틀 + 부가정보 + CTA',
  },
  {
    id: 'unified-modal',
    status: 'pending',
    sources: ['modal/BottomSheet.tsx', 'modal/Dialog.tsx', 'modal/Drawer.tsx'],
    similarity: 0.71,
    description: '모달 계열 → placement prop 기반 통합',
    notes: 'focus trap, aria-modal 구현 중복',
  },
];

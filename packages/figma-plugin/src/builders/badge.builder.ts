/**
 * Badge 컴포넌트 Figma 노드 생성
 */
import { COLORS, hexToRgb } from '../tokens';

const BADGE_VARIANTS = [
  { id: 'event', label: '이벤트', bg: COLORS.gray[1000], text: COLORS.white },
  { id: 'md', label: 'MD추천', bg: COLORS.blue[500], text: COLORS.white },
  { id: 'sale', label: '특가', bg: COLORS.red[500], text: COLORS.white },
  { id: 'new', label: 'NEW', bg: COLORS.green[500], text: COLORS.white },
  { id: 'neutral', label: '일반', bg: COLORS.gray[80], text: COLORS.gray[700] },
] as const;

export async function buildBadgeComponent(page: PageNode, xOffset: number): Promise<void> {
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  const section = figma.createFrame();
  section.name = '🏷️ Badge';
  section.layoutMode = 'VERTICAL';
  section.primaryAxisSizingMode = 'AUTO';
  section.counterAxisSizingMode = 'AUTO';
  section.itemSpacing = 20;
  section.paddingTop = 32;
  section.paddingBottom = 32;
  section.paddingLeft = 32;
  section.paddingRight = 32;
  section.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white) }];
  section.cornerRadius = 16;

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.fontSize = 20;
  title.characters = 'Badge';
  title.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[1000]) }];
  section.appendChild(title);

  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.fontSize = 13;
  desc.characters = '상품 카드 상단 뱃지. 이벤트/MD추천/특가/NEW/일반 5가지 variant';
  desc.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[500]) }];
  section.appendChild(desc);

  // 배지 row
  const row = figma.createFrame();
  row.name = 'variants';
  row.layoutMode = 'HORIZONTAL';
  row.primaryAxisSizingMode = 'AUTO';
  row.counterAxisSizingMode = 'AUTO';
  row.itemSpacing = 8;
  row.fills = [];

  for (const v of BADGE_VARIANTS) {
    const badge = figma.createFrame();
    badge.name = `Badge / ${v.id}`;
    badge.layoutMode = 'HORIZONTAL';
    badge.primaryAxisSizingMode = 'AUTO';
    badge.counterAxisSizingMode = 'AUTO';
    badge.paddingLeft = 8;
    badge.paddingRight = 8;
    badge.paddingTop = 4;
    badge.paddingBottom = 4;
    badge.cornerRadius = 4;
    badge.fills = [{ type: 'SOLID', color: hexToRgb(v.bg) }];

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Semi Bold' };
    text.fontSize = 11;
    text.characters = v.label;
    text.fills = [{ type: 'SOLID', color: hexToRgb(v.text) }];
    badge.appendChild(text);
    row.appendChild(badge);
  }

  section.appendChild(row);

  // 토큰 노트
  const noteFrame = figma.createFrame();
  noteFrame.layoutMode = 'VERTICAL';
  noteFrame.primaryAxisSizingMode = 'AUTO';
  noteFrame.counterAxisSizingMode = 'AUTO';
  noteFrame.itemSpacing = 6;
  noteFrame.paddingTop = 16;
  noteFrame.paddingBottom = 16;
  noteFrame.paddingLeft = 16;
  noteFrame.paddingRight = 16;
  noteFrame.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[80]) }];
  noteFrame.cornerRadius = 8;

  const tokenLines = [
    'event   →  bg: color.gray.1000  /  text: white',
    'MD추천  →  bg: color.blue.500   /  text: white',
    '특가    →  bg: color.red.500    /  text: white',
    'NEW     →  bg: color.green.500  /  text: white',
    '일반    →  bg: color.gray.80    /  text: color.gray.700',
  ];

  for (const line of tokenLines) {
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: 'Regular' };
    t.fontSize = 11;
    t.characters = line;
    t.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[700]) }];
    noteFrame.appendChild(t);
  }

  section.appendChild(noteFrame);
  page.appendChild(section);
  section.x = xOffset;
  section.y = 100;
}

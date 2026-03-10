/**
 * Chip 컴포넌트 Figma 노드 생성
 * Chip.types.ts 스펙 기반
 */
import { COLORS, hexToRgb } from '../tokens';

interface ChipSpec {
  label: string;
  variant: 'filled' | 'outlined';
  selected: boolean;
  size: 'medium' | 'small';
}

const SIZE_SPEC = {
  medium: { height: 36, paddingX: 12, fontSize: 14 },
  small: { height: 28, paddingX: 10, fontSize: 12 },
};

function getChipColors(variant: 'filled' | 'outlined', selected: boolean) {
  if (variant === 'outlined') {
    return {
      bg: COLORS.white,
      text: selected ? COLORS.gray[1000] : COLORS.gray[700],
      border: selected ? COLORS.gray[1000] : COLORS.gray[100],
      hasBorder: true,
    };
  }
  return {
    bg: selected ? COLORS.gray[1000] : COLORS.gray[80],
    text: selected ? COLORS.white : COLORS.gray[700],
    border: '',
    hasBorder: false,
  };
}

async function loadFont() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
}

function createChipNode(spec: ChipSpec): FrameNode {
  const sizeSpec = SIZE_SPEC[spec.size];
  const colors = getChipColors(spec.variant, spec.selected);

  // 컨테이너 프레임
  const frame = figma.createFrame();
  frame.name = `Chip / ${spec.variant} / ${spec.selected ? 'selected' : 'default'} / ${spec.size}`;
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  frame.paddingLeft = sizeSpec.paddingX;
  frame.paddingRight = sizeSpec.paddingX;
  frame.paddingTop = 0;
  frame.paddingBottom = 0;
  frame.resize(1, sizeSpec.height); // width는 hugging으로 처리
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.cornerRadius = 99;

  // 배경색
  const bgRgb = hexToRgb(colors.bg);
  frame.fills = [{ type: 'SOLID', color: bgRgb }];

  // 테두리
  if (colors.hasBorder) {
    const borderRgb = hexToRgb(colors.border);
    frame.strokes = [{ type: 'SOLID', color: borderRgb }];
    frame.strokeWeight = 1;
    frame.strokeAlign = 'INSIDE';
  } else {
    frame.strokes = [];
  }

  // 텍스트
  const text = figma.createText();
  text.fontName = { family: 'Inter', style: 'Semi Bold' };
  text.fontSize = sizeSpec.fontSize;
  text.characters = spec.label;
  const textRgb = hexToRgb(colors.text);
  text.fills = [{ type: 'SOLID', color: textRgb }];

  frame.appendChild(text);
  return frame;
}

export async function buildChipComponent(page: PageNode): Promise<void> {
  await loadFont();

  // Chip 섹션 프레임
  const section = figma.createFrame();
  section.name = '🧩 Chip';
  section.layoutMode = 'VERTICAL';
  section.primaryAxisSizingMode = 'AUTO';
  section.counterAxisSizingMode = 'AUTO';
  section.itemSpacing = 24;
  section.paddingTop = 32;
  section.paddingBottom = 32;
  section.paddingLeft = 32;
  section.paddingRight = 32;
  section.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white) }];
  section.cornerRadius = 16;

  // 제목
  const title = figma.createText();
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.fontSize = 20;
  title.characters = 'Chip';
  title.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[1000]) }];
  section.appendChild(title);

  // 설명
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.fontSize = 13;
  desc.characters = '필터/카테고리 선택용 칩. filled/outlined × selected/default × medium/small';
  desc.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[500]) }];
  section.appendChild(desc);

  // variant × selected 행렬
  const variants: Array<'filled' | 'outlined'> = ['filled', 'outlined'];
  const sizes: Array<'medium' | 'small'> = ['medium', 'small'];
  const labels = ['전체', 'NOL 티켓', '호텔/리조트', '펜션/풀빌라'];

  for (const size of sizes) {
    // 사이즈 레이블
    const sizeLabel = figma.createText();
    sizeLabel.fontName = { family: 'Inter', style: 'Semi Bold' };
    sizeLabel.fontSize = 12;
    sizeLabel.characters = `size: ${size}`;
    sizeLabel.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[400]) }];
    section.appendChild(sizeLabel);

    for (const variant of variants) {
      const row = figma.createFrame();
      row.name = `${variant} / ${size}`;
      row.layoutMode = 'HORIZONTAL';
      row.primaryAxisSizingMode = 'AUTO';
      row.counterAxisSizingMode = 'AUTO';
      row.itemSpacing = 8;
      row.fills = [];

      // selected + 나머지 칩들
      const specs: ChipSpec[] = [
        { label: labels[0], variant, selected: true, size },
        ...labels.slice(1).map((l) => ({ label: l, variant, selected: false, size })),
      ];

      for (const spec of specs) {
        const chip = createChipNode(spec);
        row.appendChild(chip);
      }

      section.appendChild(row);
    }
  }

  // 상태별 설명 노트
  const noteFrame = figma.createFrame();
  noteFrame.name = 'tokens';
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
    'filled + selected  →  bg: color.gray.1000  /  text: white',
    'filled + default   →  bg: color.gray.80  /  text: color.gray.700',
    'outlined + selected  →  border: color.gray.1000  /  text: color.gray.1000',
    'outlined + default   →  border: color.gray.100  /  text: color.gray.700',
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

  // 위치 조정
  section.x = 100;
  section.y = 100;
}

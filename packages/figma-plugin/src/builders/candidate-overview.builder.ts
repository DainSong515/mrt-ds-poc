/**
 * DS 후보군 전체 현황 오버뷰 프레임 생성
 */
import { COLORS, hexToRgb } from '../tokens';
import { CANDIDATE_REGISTRY, DSCandidate } from '../candidates';

const STATUS_CONFIG = {
  'in-progress': { emoji: '🔨', color: COLORS.blue[500], bg: COLORS.blue[80] },
  'pending': { emoji: '⏳', color: COLORS.yellow[500], bg: '#fffbeb' },
  'completed': { emoji: '✅', color: COLORS.green[500], bg: '#ecfdf5' },
  'rejected': { emoji: '❌', color: COLORS.red[500], bg: '#fef2f2' },
} as const;

export async function buildCandidateOverview(page: PageNode): Promise<void> {
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  // 전체 오버뷰 헤더
  const header = figma.createFrame();
  header.name = '📋 DS 후보군 현황';
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'FIXED';
  header.resize(800, 100);
  header.itemSpacing = 8;
  header.paddingTop = 32;
  header.paddingBottom = 32;
  header.paddingLeft = 32;
  header.paddingRight = 32;
  header.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[1000]) }];
  header.cornerRadius = 16;

  const headerTitle = figma.createText();
  headerTitle.fontName = { family: 'Inter', style: 'Bold' };
  headerTitle.fontSize = 28;
  headerTitle.characters = 'MRT Design System 후보군';
  headerTitle.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white) }];
  header.appendChild(headerTitle);

  const summary = CANDIDATE_REGISTRY.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const summaryText = figma.createText();
  summaryText.fontName = { family: 'Inter', style: 'Regular' };
  summaryText.fontSize = 14;
  summaryText.characters = `대기중 ${summary.pending ?? 0}  |  진행중 ${summary['in-progress'] ?? 0}  |  완료 ${summary.completed ?? 0}  |  거부 ${summary.rejected ?? 0}`;
  summaryText.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[300]) }];
  header.appendChild(summaryText);

  page.appendChild(header);
  header.x = 100;
  header.y = 600;

  // 각 후보군 카드
  let cardX = 100;
  const cardY = 780;

  for (const candidate of CANDIDATE_REGISTRY) {
    const card = createCandidateCard(candidate);
    page.appendChild(card);
    card.x = cardX;
    card.y = cardY;
    cardX += card.width + 16;
  }
}

function createCandidateCard(candidate: DSCandidate): FrameNode {
  const config = STATUS_CONFIG[candidate.status];

  const card = figma.createFrame();
  card.name = `후보군 / ${candidate.id}`;
  card.layoutMode = 'VERTICAL';
  card.primaryAxisSizingMode = 'AUTO';
  card.counterAxisSizingMode = 'FIXED';
  card.resize(220, 100);
  card.itemSpacing = 8;
  card.paddingTop = 20;
  card.paddingBottom = 20;
  card.paddingLeft = 20;
  card.paddingRight = 20;
  card.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white) }];
  card.cornerRadius = 12;
  card.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[100]) }];
  card.strokeWeight = 1;
  card.strokeAlign = 'INSIDE';

  // 상태 배지
  const statusBadge = figma.createFrame();
  statusBadge.layoutMode = 'HORIZONTAL';
  statusBadge.primaryAxisSizingMode = 'AUTO';
  statusBadge.counterAxisSizingMode = 'AUTO';
  statusBadge.paddingLeft = 8;
  statusBadge.paddingRight = 8;
  statusBadge.paddingTop = 3;
  statusBadge.paddingBottom = 3;
  statusBadge.cornerRadius = 99;
  statusBadge.fills = [{ type: 'SOLID', color: hexToRgb(config.bg) }];

  const statusText = figma.createText();
  statusText.fontName = { family: 'Inter', style: 'Semi Bold' };
  statusText.fontSize = 11;
  statusText.characters = `${config.emoji} ${candidate.status}`;
  statusText.fills = [{ type: 'SOLID', color: hexToRgb(config.color) }];
  statusBadge.appendChild(statusText);
  card.appendChild(statusBadge);

  // 제목
  const titleText = figma.createText();
  titleText.fontName = { family: 'Inter', style: 'Bold' };
  titleText.fontSize = 15;
  titleText.characters = candidate.id;
  titleText.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[1000]) }];
  card.appendChild(titleText);

  // 설명
  const descText = figma.createText();
  descText.fontName = { family: 'Inter', style: 'Regular' };
  descText.fontSize = 12;
  descText.characters = candidate.description;
  descText.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[600]) }];
  (descText as TextNode).textAutoResize = 'HEIGHT';
  card.appendChild(descText);

  // 유사도
  const similarityBar = figma.createFrame();
  similarityBar.layoutMode = 'HORIZONTAL';
  similarityBar.primaryAxisSizingMode = 'AUTO';
  similarityBar.counterAxisSizingMode = 'AUTO';
  similarityBar.itemSpacing = 6;
  similarityBar.fills = [];

  const simLabel = figma.createText();
  simLabel.fontName = { family: 'Inter', style: 'Regular' };
  simLabel.fontSize = 11;
  simLabel.characters = `유사도 ${Math.round(candidate.similarity * 100)}%`;
  simLabel.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[500]) }];
  similarityBar.appendChild(simLabel);
  card.appendChild(similarityBar);

  return card;
}

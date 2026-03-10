/**
 * Figma 플러그인 메인 코드
 * Plugin API 환경에서 실행됨 (브라우저 내)
 */
import { buildChipComponent } from './builders/chip.builder';
import { buildBadgeComponent } from './builders/badge.builder';
import { buildCandidateOverview } from './builders/candidate-overview.builder';
import { createApprovePR } from './github';
import { buildApproveFiles } from './scaffolding';

figma.showUI(__html__, { width: 340, height: 620, title: 'MRT DS Candidate Sync' });

figma.ui.onmessage = async (msg) => {
  // 승인 PR 생성
  if (msg.type === 'approve') {
    const { candidateId, githubToken, githubOwner, githubRepo } = msg as {
      candidateId: string;
      githubToken: string;
      githubOwner: string;
      githubRepo: string;
    };

    try {
      figma.ui.postMessage({ type: 'progress', message: `${candidateId} PR 생성 중...` });

      const files = buildApproveFiles(candidateId);
      const prUrl = await createApprovePR(
        { token: githubToken, owner: githubOwner, repo: githubRepo },
        candidateId,
        files
      );

      figma.ui.postMessage({ type: 'approved', candidateId, prUrl });
    } catch (err) {
      figma.ui.postMessage({ type: 'error', message: String(err) });
    }
    return;
  }

  if (msg.type !== 'sync') return;

  const { components, options } = msg as {
    components: string[];
    options: { overview: boolean; tokenNote: boolean };
  };

  try {
    // DS Candidates 전용 페이지 찾거나 생성
    let page = figma.root.children.find((p) => p.name === '🧩 DS Candidates') as PageNode | undefined;
    if (!page) {
      page = figma.createPage();
      page.name = '🧩 DS Candidates';
    }
    await figma.setCurrentPageAsync(page);

    let xOffset = 100;
    const COMPONENT_GAP = 40;

    figma.ui.postMessage({ type: 'progress', message: '페이지 준비 완료' });

    // 컴포넌트 순서대로 생성
    if (components.includes('chip')) {
      figma.ui.postMessage({ type: 'progress', message: 'Chip 생성 중...' });
      await buildChipComponent(page);
      // chip 섹션 너비 파악해서 다음 x 계산
      const chipFrame = page.children.find((n) => n.name === '🧩 Chip');
      if (chipFrame) xOffset = chipFrame.x + chipFrame.width + COMPONENT_GAP;
    }

    if (components.includes('badge')) {
      figma.ui.postMessage({ type: 'progress', message: 'Badge 생성 중...' });
      await buildBadgeComponent(page, xOffset);
      const badgeFrame = page.children.find((n) => n.name === '🏷️ Badge');
      if (badgeFrame) xOffset = badgeFrame.x + badgeFrame.width + COMPONENT_GAP;
    }

    if (components.includes('input')) {
      figma.ui.postMessage({ type: 'progress', message: 'Input 스펙 생성 중...' });
      await buildInputSpec(page, xOffset);
    }

    if (components.includes('card')) {
      figma.ui.postMessage({ type: 'progress', message: 'Card 스펙 생성 중...' });
      await buildCardSpec(page, xOffset);
    }

    // 후보군 오버뷰 (항상 아래쪽에)
    if (options.overview) {
      figma.ui.postMessage({ type: 'progress', message: '후보군 현황 오버뷰 생성 중...' });
      await buildCandidateOverview(page);
    }

    // 뷰포트를 생성된 콘텐츠로 이동
    figma.viewport.scrollAndZoomIntoView(page.children as readonly SceneNode[]);

    figma.ui.postMessage({
      type: 'done',
      message: `${components.length}개 컴포넌트 생성 완료 → "🧩 DS Candidates" 페이지 확인`,
    });

  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      message: String(error),
    });
  }
};

/** Input 스펙 프레임 (컴포넌트 미구현, 스펙 문서 형태) */
async function buildInputSpec(page: PageNode, xOffset: number): Promise<void> {
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  const { hexToRgb } = await import('./tokens');
  const { COLORS } = await import('./tokens');

  const frame = figma.createFrame();
  frame.name = '📝 Input (pending)';
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.resize(280, 100);
  frame.itemSpacing = 12;
  frame.paddingTop = 32;
  frame.paddingBottom = 32;
  frame.paddingLeft = 32;
  frame.paddingRight = 32;
  frame.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white) }];
  frame.cornerRadius = 16;
  frame.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[100]) }];
  frame.strokeWeight = 2;
  frame.strokeAlign = 'INSIDE';
  frame.dashPattern = [6, 4]; // 점선 = 진행 예정

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.fontSize = 20;
  title.characters = 'Input ⏳';
  title.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[1000]) }];
  frame.appendChild(title);

  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.fontSize = 13;
  desc.characters = 'TextInput + SearchInput + NumberInput → type prop 기반 통합\n\n유사도: 83%\nstatus: pending';
  desc.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[500]) }];
  frame.appendChild(desc);

  page.appendChild(frame);
  frame.x = xOffset;
  frame.y = 100;
}

/** Card 스펙 프레임 */
async function buildCardSpec(page: PageNode, xOffset: number): Promise<void> {
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  const { hexToRgb, COLORS } = await import('./tokens');

  const frame = figma.createFrame();
  frame.name = '🃏 Card (pending)';
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.resize(280, 100);
  frame.itemSpacing = 12;
  frame.paddingTop = 32;
  frame.paddingBottom = 32;
  frame.paddingLeft = 32;
  frame.paddingRight = 32;
  frame.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white) }];
  frame.cornerRadius = 16;
  frame.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[100]) }];
  frame.strokeWeight = 2;
  frame.strokeAlign = 'INSIDE';
  frame.dashPattern = [6, 4];

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.fontSize = 20;
  title.characters = 'Card ⏳';
  title.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[1000]) }];
  frame.appendChild(title);

  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.fontSize = 13;
  desc.characters = 'ProductCard + HotelCard + FlightCard + ActivityCard\n→ slot 기반 단일 Card\n\n유사도: 76%\nstatus: pending';
  desc.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray[500]) }];
  frame.appendChild(desc);

  page.appendChild(frame);
  frame.x = xOffset;
  frame.y = 100;
}

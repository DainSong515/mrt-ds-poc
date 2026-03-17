import resultData from './design-check-results.json';

export type ImplementationStatus = 'done' | 'in-progress' | 'not-ready' | 'not-planned';

export interface PlatformStatus {
  status: ImplementationStatus;
  componentName?: string;
  framework?: string;
  matchRate?: number;
}

export interface ProgressEntry {
  name: string;
  href: string;
  category: 'component' | 'token';
  figmaUrl?: string;
  platforms: {
    web: PlatformStatus;
    ios: PlatformStatus;
  };
}

interface DesignCheckResult {
  component: string;
  platform: 'web' | 'ios';
  summary: { total: number; match: number; mismatch: number; matchRate: number };
}

const PROGRESS_DATA: ProgressEntry[] = [
  // Components
  {
    name: 'Button',
    href: '/components/button',
    category: 'component',
    platforms: {
      web: { status: 'done', componentName: 'Button' },
      ios: { status: 'not-ready', componentName: 'ButtonComponent', framework: 'UIKit' },
    },
  },
  {
    name: 'Text',
    href: '/components/text',
    category: 'component',
    platforms: {
      web: { status: 'done', componentName: 'Text' },
      ios: { status: 'not-ready', componentName: 'TextComponent', framework: 'Both' },
    },
  },
  {
    name: 'Icon',
    href: '/components/icon',
    category: 'component',
    platforms: {
      web: { status: 'done', componentName: 'Icon' },
      ios: { status: 'not-planned', componentName: 'IconComponent', framework: 'UIKit' },
    },
  },
  {
    name: 'Chip',
    href: '/components/chip',
    category: 'component',
    platforms: {
      web: { status: 'done', componentName: 'Chip' },
      ios: { status: 'not-planned', componentName: 'TagComponent', framework: 'UIKit' },
    },
  },
  {
    name: 'TabBar',
    href: '/components/tabbar',
    category: 'component',
    platforms: {
      web: { status: 'done', componentName: 'TabBar' },
      ios: { status: 'not-planned', componentName: 'CommonTabBarView', framework: 'Both' },
    },
  },
  // Tokens
  {
    name: 'Color',
    href: '/tokens/color',
    category: 'token',
    platforms: {
      web: { status: 'done' },
      ios: { status: 'done' },
    },
  },
  {
    name: 'Typography',
    href: '/tokens/typography',
    category: 'token',
    platforms: {
      web: { status: 'done' },
      ios: { status: 'in-progress' },
    },
  },
  {
    name: 'Shadow',
    href: '/tokens/shadow',
    category: 'token',
    platforms: {
      web: { status: 'done' },
      ios: { status: 'not-ready' },
    },
  },
];

function deriveStatus(matchRate: number): ImplementationStatus {
  if (matchRate >= 90) return 'done';
  if (matchRate >= 50) return 'in-progress';
  return 'not-ready';
}

export function buildProgressBoard(): ProgressEntry[] {
  const results = (resultData as { results: DesignCheckResult[] }).results;

  return PROGRESS_DATA.map((entry) => {
    const updated = { ...entry, platforms: { web: { ...entry.platforms.web }, ios: { ...entry.platforms.ios } } };

    for (const platform of ['web', 'ios'] as const) {
      const result = results.find(
        (r) => r.component === entry.name && r.platform === platform,
      );
      if (result) {
        updated.platforms[platform].matchRate = result.summary.matchRate;
        if (updated.platforms[platform].status !== 'not-planned') {
          updated.platforms[platform].status = deriveStatus(result.summary.matchRate);
        }
      }
    }

    return updated;
  });
}

export function getOverallStats(entries: ProgressEntry[]) {
  const figmaTotal = entries.length;
  const figmaDone = figmaTotal; // All items have Figma designs

  const calc = (platform: 'web' | 'ios') => {
    const applicable = entries.filter((e) => e.platforms[platform].status !== 'not-planned');
    const done = applicable.filter((e) => e.platforms[platform].status === 'done');
    return { done: done.length, total: applicable.length, pct: applicable.length > 0 ? Math.round((done.length / applicable.length) * 100) : 0 };
  };

  return {
    figma: { done: figmaDone, total: figmaTotal, pct: 100 },
    web: calc('web'),
    ios: calc('ios'),
  };
}

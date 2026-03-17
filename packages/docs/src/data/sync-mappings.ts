export interface SyncMapping {
  codeTokenPattern: string;
  filePath: string;
  jsonPath: string;
  platform: 'web' | 'ios';
  repo: 'frontend-dubai' | 'ios-traveler';
}

// Target repositories
export const TARGET_REPOS = {
  'frontend-dubai': {
    label: 'frontend-dubai',
    owner: 'myrealtrip',
    repo: 'frontend-dubai',
    localPath: '/Users/ran-sunwoo/IdeaProjects/frontend-dubai',
    description: 'Web 프론트엔드 (React)',
  },
  'ios-traveler': {
    label: 'ios-traveler',
    owner: 'myrealtrip',
    repo: 'ios-traveler',
    localPath: '/Users/dain.song/ios/MRT',
    description: 'iOS 앱 (Swift)',
  },
} as const;

export const SYNC_MAPPINGS: SyncMapping[] = [
  // Web token files → frontend-dubai
  {
    codeTokenPattern: 'color.gray.',
    filePath: 'packages/theme/src/tokens/scale/color.scale.json',
    jsonPath: 'color.gray.{step}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  {
    codeTokenPattern: 'color.blue.',
    filePath: 'packages/theme/src/tokens/scale/color.scale.json',
    jsonPath: 'color.blue.{step}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  {
    codeTokenPattern: 'color.green.',
    filePath: 'packages/theme/src/tokens/scale/color.scale.json',
    jsonPath: 'color.green.{step}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  {
    codeTokenPattern: 'color.yellow.',
    filePath: 'packages/theme/src/tokens/scale/color.scale.json',
    jsonPath: 'color.yellow.{step}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  {
    codeTokenPattern: 'color.red.',
    filePath: 'packages/theme/src/tokens/scale/color.scale.json',
    jsonPath: 'color.red.{step}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  {
    codeTokenPattern: 'color.purple.',
    filePath: 'packages/theme/src/tokens/scale/color.scale.json',
    jsonPath: 'color.purple.{step}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  {
    codeTokenPattern: 'button.',
    filePath: 'packages/theme/src/tokens/component/button.component.json',
    jsonPath: 'button.{variant}.{property}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  {
    codeTokenPattern: 'color.surface',
    filePath: 'packages/theme/src/tokens/semantic/color.semantic.json',
    jsonPath: 'color.surface.{name}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  {
    codeTokenPattern: 'color.content',
    filePath: 'packages/theme/src/tokens/semantic/color.semantic.json',
    jsonPath: 'color.content.{name}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  {
    codeTokenPattern: 'color.interactive',
    filePath: 'packages/theme/src/tokens/semantic/color.semantic.json',
    jsonPath: 'color.interactive.{name}.$value',
    platform: 'web',
    repo: 'frontend-dubai',
  },
  // iOS token files → ios-mrt
  {
    codeTokenPattern: 'DynamicColor.',
    filePath: 'MRT/DesignSystem/DynamicColor.swift',
    jsonPath: 'DynamicColor.{colorName}',
    platform: 'ios',
    repo: 'ios-traveler',
  },
  {
    codeTokenPattern: 'UDTypography.',
    filePath: 'MRT/DesignSystem/UDTypography+Attribute.swift',
    jsonPath: 'UDTypography.{typographyName}',
    platform: 'ios',
    repo: 'ios-traveler',
  },
  {
    codeTokenPattern: 'lineHeightMultiple',
    filePath: 'MRT/DesignSystem/UDTypography+Attribute.swift',
    jsonPath: 'lineHeightMultiple',
    platform: 'ios',
    repo: 'ios-traveler',
  },
];

export interface SyncInfo {
  filePath: string;
  jsonPath: string;
  currentValue: string;
  expectedValue: string;
  claudeCommand: string;
  repo: 'frontend-dubai' | 'ios-traveler';
}

// Property patterns for fallback when codeToken is absent (e.g., Color scale tokens)
const PROPERTY_TO_TOKEN: Record<string, string> = {
  'gray.': 'color.gray.',
  'blue.': 'color.blue.',
  'green.': 'color.green.',
  'yellow.': 'color.yellow.',
  'red.': 'color.red.',
  'purple.': 'color.purple.',
  'white': 'color.gray.',
};

export function findSyncMapping(
  codeToken: string | undefined,
  property: string,
  platform: 'web' | 'ios',
): SyncMapping | undefined {
  // Direct match by codeToken
  if (codeToken) {
    const direct = SYNC_MAPPINGS.find(
      (m) => m.platform === platform && codeToken.startsWith(m.codeTokenPattern),
    );
    if (direct) return direct;
  }

  // Fallback: infer from property name (for Color/Typography scale items without codeToken)
  for (const [propPrefix, tokenPattern] of Object.entries(PROPERTY_TO_TOKEN)) {
    if (property.startsWith(propPrefix)) {
      return SYNC_MAPPINGS.find(
        (m) => m.platform === platform && m.codeTokenPattern === tokenPattern,
      );
    }
  }

  return undefined;
}

export function buildSyncInfo(
  mapping: SyncMapping,
  property: string,
  codeToken: string,
  codeValue: string,
  figmaValue: string,
  component: string,
): SyncInfo {
  const resolvedJsonPath = mapping.jsonPath
    .replace('{step}', property.split('.').pop() || '')
    .replace('{variant}', property.split('/')[0] || '')
    .replace('{property}', property.split('/')[1] || '')
    .replace('{name}', property.split('.').pop() || '')
    .replace('{colorName}', codeToken.replace('DynamicColor.', ''))
    .replace('{typographyName}', codeToken.replace('UDTypography.', ''));

  return {
    filePath: mapping.filePath,
    jsonPath: resolvedJsonPath,
    currentValue: codeValue,
    expectedValue: figmaValue,
    claudeCommand: `/design-check sync ${component} ${property}`,
    repo: mapping.repo,
  };
}

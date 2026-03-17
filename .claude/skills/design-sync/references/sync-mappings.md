# Sync Mappings 요약

> Source: `packages/docs/src/data/sync-mappings.ts`

## Target Repos

| Key | Owner/Repo | Platform | Description |
|-----|-----------|----------|-------------|
| `frontend-dubai` | `myrealtrip/frontend-dubai` | Web (React) | 프론트엔드 |
| `ios-traveler` | `myrealtrip/ios-traveler` | iOS (Swift) | iOS 앱 |

## Web Mappings (frontend-dubai)

### Color Scale Tokens

| codeTokenPattern | filePath | jsonPath |
|-----------------|----------|----------|
| `color.gray.` | `packages/theme/src/tokens/scale/color.scale.json` | `color.gray.{step}.$value` |
| `color.blue.` | `packages/theme/src/tokens/scale/color.scale.json` | `color.blue.{step}.$value` |
| `color.green.` | `packages/theme/src/tokens/scale/color.scale.json` | `color.green.{step}.$value` |
| `color.yellow.` | `packages/theme/src/tokens/scale/color.scale.json` | `color.yellow.{step}.$value` |
| `color.red.` | `packages/theme/src/tokens/scale/color.scale.json` | `color.red.{step}.$value` |
| `color.purple.` | `packages/theme/src/tokens/scale/color.scale.json` | `color.purple.{step}.$value` |

### Semantic Color Tokens

| codeTokenPattern | filePath | jsonPath |
|-----------------|----------|----------|
| `color.surface` | `packages/theme/src/tokens/semantic/color.semantic.json` | `color.surface.{name}.$value` |
| `color.content` | `packages/theme/src/tokens/semantic/color.semantic.json` | `color.content.{name}.$value` |
| `color.interactive` | `packages/theme/src/tokens/semantic/color.semantic.json` | `color.interactive.{name}.$value` |

### Component Tokens

| codeTokenPattern | filePath | jsonPath |
|-----------------|----------|----------|
| `button.` | `packages/theme/src/tokens/component/button.component.json` | `button.{variant}.{property}.$value` |

## iOS Mappings (ios-traveler)

| codeTokenPattern | filePath | jsonPath |
|-----------------|----------|----------|
| `DynamicColor.` | `MRT/DesignSystem/DynamicColor.swift` | `DynamicColor.{colorName}` |
| `UDTypography.` | `MRT/DesignSystem/UDTypography+Attribute.swift` | `UDTypography.{typographyName}` |
| `lineHeightMultiple` | `MRT/DesignSystem/UDTypography+Attribute.swift` | `lineHeightMultiple` |

## Property Fallback (codeToken 없을 때)

`property` prefix로 codeTokenPattern 유추:

| property prefix | → codeTokenPattern |
|----------------|-------------------|
| `gray.` | `color.gray.` |
| `blue.` | `color.blue.` |
| `green.` | `color.green.` |
| `yellow.` | `color.yellow.` |
| `red.` | `color.red.` |
| `purple.` | `color.purple.` |
| `white` | `color.gray.` |

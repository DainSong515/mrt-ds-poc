# 플랫폼별 Figma-코드 값 변환 규칙

## iOS 변환 규칙

### lineHeight

Figma `%` → iOS `lineHeightMultiple` (소수):

```
Figma 124% → lineHeightMultiple: 1.24
Figma 138% → lineHeightMultiple: 1.38
Figma 135% → lineHeightMultiple: 1.35
```

계산: `% ÷ 100`

**주의**: `UDTypography+Attribute.swift`에서 각 typography case의 `lineHeightMultiple` 값을 개별적으로 수정해야 한다. 파일 내 일괄 replace 금지 — 같은 값을 가진 다른 case가 영향받을 수 있다.

### fontWeight

Figma 숫자 → iOS `UIFont.Weight` enum:

| Figma | iOS |
|-------|-----|
| `700` | `.bold` |
| `600` | `.semibold` |
| `500` | `.medium` |
| `400` | `.regular` |
| `300` | `.light` |

### Color (hex)

Figma hex → `DynamicColor` static property의 hex 값 직접 수정.

```swift
// DynamicColor.swift 예시
static let gray1000 = DynamicColor(
    light: UIColor(hex: "#101418"),  // ← 이 값 수정
    dark: UIColor(hex: "#F8F9FA")
)
```

**주의**: 다크모드 쌍 확인 필수. `light:` 값만 Figma와 대조하고, `dark:` 값은 별도 Figma 다크모드 spec이 없으면 수정하지 않는다.

### fontSize

Figma `px` → iOS `pt` (1:1 대응, 단위만 다름):

```
Figma 16px → iOS 16pt (CGFloat = 16)
```

## Web 변환 규칙

### Color (hex)

hex 값 직접 대응. 대소문자만 다를 수 있다 (case-insensitive 비교).

```json
{
  "color": {
    "gray": {
      "1000": {
        "$value": "#101418",
        "$type": "color"
      }
    }
  }
}
```

**주의**: `$value` 필드만 수정. `$type`, `$description` 등 메타데이터는 절대 수정하지 않는다.

### Spacing

Figma `px` → JSON `$value` 필드:

```json
{
  "button": {
    "size": {
      "large": {
        "height": {
          "$value": "50px",
          "$type": "dimension"
        }
      }
    }
  }
}
```

### Typography

Web은 `%` 단위 그대로 사용:

```
Figma 124% → Web "124%" (변환 불필요)
```

## 공통 수정 주의사항

1. **한 번에 한 property씩** 수정하고 커밋한다. 대량 일괄 수정은 리뷰가 어렵다.
2. **case-insensitive hex 비교**: `#101418` vs `#141719`는 mismatch지만, `#2B96ED` vs `#2b96ed`는 match다.
3. **매핑 미발견 시**: 수동 확인 목록에 추가하고 넘어간다. 임의로 파일을 추측하지 않는다.
4. **파일 인코딩**: GitHub API는 base64 인코딩을 사용한다. 수정 후 반드시 base64 인코딩하여 커밋한다.

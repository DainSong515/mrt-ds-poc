# MyRealTrip 디자인 시스템 PoC

## MCP 서버 사용법

`web-ui` MCP 서버가 연결되어 있다. **컴포넌트 구현 전 반드시 MCP Tool을 호출**해서 올바른 Props를 확인한다.

### Quick Start (v0.3.0)
```
1. discover_tools()              → 전체 도구 + 카테고리 확인
2. list_components(platform?)    → 컴포넌트 목록 + 상태
3. get_component(name, platform?) → 통합 스펙 (Props, 예시, 안티패턴)
```

### 도구 카테고리

| Category | Tool | Description |
|----------|------|-------------|
| **Discovery** | `discover_tools(query?, category?)` | 전체 도구 목록 + 카테고리 (시작점) |
| **Components** | `list_components(platform?)` | 컴포넌트 목록 + 플랫폼별 상태 |
| **Components** | `get_component(name, platform?)` | 통합 컴포넌트 스펙 (기존 3개 대체) |
| **Tokens** | `get_token(name)` | 토큰 이름으로 값 조회 |
| **Tokens** | `get_semantic_token(intent)` | 의도 기반 토큰 |
| **Search** | `search_design_system(query)` | BM25 자연어 검색 |
| **Design Check** | `get_design_check_status()` | Figma-코드 동기화 현황 |
| **Design Check** | `get_design_check_mismatches(component, platform?)` | 불일치 + fix 정보 |
| **Icons** | `list_icons(category?)` | 카테고리별 아이콘 목록 |
| **Icons** | `search_icons(keyword)` | 키워드 아이콘 검색 (한글/영문) |
| **Candidates** | `get_ds_candidates(status?)` | DS 후보군 목록 |
| **Candidates** | `register_ds_candidate(id, description, sources)` | 후보군 등록 |

### Deprecated (하위 호환 유지)
```
get_button_usage → get_component("Button")
get_text_usage   → get_component("Text")
get_icon_usage   → search_icons(keyword)
```

> **platform 파라미터**: `'web'`(기본) | `'ios'`. iOS 선택 시 Swift/UIKit 기반 응답 반환.

## iOS 컴포넌트 매핑

| Web | iOS | 프레임워크 |
|-----|-----|-----------|
| Button | ButtonComponent + DynamicButtonStyle | UIKit |
| Text | TextComponent + DynamicTextStyle + UDTypography | Both |
| Icon | IconComponent + DynamicIconStyle | UIKit |
| Chip | TagComponent + DynamicTagStyle | UIKit |
| TabBar | CommonTabBarView + SwiftUITabBarView | Both |

## 패키지 구조

```
packages/
  tokens/           # W3C DTCG JSON 디자인 토큰
    src/
      scale/        # 원시 값 (color, shadow, typography)
      semantic/     # 의도 기반 참조 (color, shadow, typography)
      component/    # 컴포넌트별 세부 토큰 (button)
  ui/               # React 컴포넌트 (Button, Text, Icon)
  docs/             # Docs 사이트 (React SPA)
    src/
      data/         # progress-board.ts, sync-mappings.ts, design-check-results.json
      pages/        # ProgressBoardPage, DesignCheckPage 등
  ai-index/         # llms.txt + BM25 검색 인덱스 (빌드 산출물: dist/)
  mcp-server/       # MCP 서버 (14개 Tool, v0.3.0)
```

## 빌드

```bash
# ai-index 산출물 재생성
cd packages/ai-index && npm run build

# mcp-server 컴파일
cd packages/mcp-server && npx tsc

# docs 개발 서버
yarn dev:docs

# 전체 빌드 (turbo)
yarn build
```

## 소스 참조

- **frontend-dubai**: `/Users/ran-sunwoo/IdeaProjects/frontend-dubai`
  - 컴포넌트: `packages/components/src/`
  - 테마/토큰: `packages/theme/src/tokens/`

## 실패 케이스 기준

아래 코드가 생성되면 MCP 미동작으로 판단:
- `<button style={{ backgroundColor: '#141719' }}>` — 일반 button 태그
- `variant="solid"` — 존재하지 않는 variant
- `typography="body1"` — 존재하지 않는 typography

## 검증 명령

```bash
# tool 목록 확인
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | \
  node packages/mcp-server/dist/index.js 2>/dev/null

# discover_tools 테스트
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"discover_tools","arguments":{}}}' | \
  node packages/mcp-server/dist/index.js 2>/dev/null

# list_components 테스트
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list_components","arguments":{}}}' | \
  node packages/mcp-server/dist/index.js 2>/dev/null

# design check status 테스트
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_design_check_status","arguments":{}}}' | \
  node packages/mcp-server/dist/index.js 2>/dev/null

# 하위 호환 (deprecated) 테스트
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_button_usage","arguments":{}}}' | \
  node packages/mcp-server/dist/index.js 2>/dev/null
```

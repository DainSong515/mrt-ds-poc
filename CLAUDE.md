# MyRealTrip 디자인 시스템 PoC

## MCP 서버 사용법

`web-ui` MCP 서버가 연결되어 있다. **컴포넌트 구현 전 반드시 MCP Tool을 호출**해서 올바른 Props를 확인한다.

### 기존 4개 Tool
```
Button 구현 시:    get_button_usage(variant?)
Text 구현 시:      get_text_usage(use_case?)
Icon 검색 시:      get_icon_usage(keyword?)
토큰 조회 시:      get_token(name)
```

### 신규 3개 Tool (v0.2.0)
```
자연어 검색:       search_design_system(query)    예: "로딩 버튼", "텍스트 말줄임"
의도 기반 토큰:    get_semantic_token(intent)     예: "disabled", "surface", "CTA"
후보군 확인:       get_ds_candidates(status?)     예: "pending"
```

## 패키지 구조

```
packages/
  tokens/           # W3C DTCG JSON 디자인 토큰
    src/
      scale/        # 원시 값 (color, shadow, typography)
      semantic/     # 의도 기반 참조 (color, shadow, typography)
      component/    # 컴포넌트별 세부 토큰 (button)
  ui/               # React 컴포넌트 (Button, Text, Icon)
  ai-index/         # llms.txt + BM25 검색 인덱스 (빌드 산출물: dist/)
  mcp-server/       # MCP 서버 (7개 Tool)
```

## 빌드

```bash
# ai-index 산출물 재생성
cd packages/ai-index && npm run build

# mcp-server 컴파일
cd packages/mcp-server && npx tsc

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

# BM25 검색 테스트
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_design_system","arguments":{"query":"로딩 버튼"}}}' | \
  node packages/mcp-server/dist/index.js 2>/dev/null

# semantic token 테스트
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_semantic_token","arguments":{"intent":"disabled"}}}' | \
  node packages/mcp-server/dist/index.js 2>/dev/null
```

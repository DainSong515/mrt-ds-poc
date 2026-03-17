---
paths:
  - "**/mcp-server/src/**"
---

# MCP Server 도구 개발 규칙

## 도구 등록 패턴

`index.ts`에서 도구를 등록하는 패턴:

```typescript
// 1. ListToolsRequestSchema에 도구 스키마 추가
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'tool_name',
        description: '도구 설명 (한글)',
        inputSchema: {
          type: 'object',
          properties: { /* ... */ },
          required: [ /* ... */ ],
        },
      },
    ],
  };
});

// 2. CallToolRequestSchema에 핸들러 추가
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case 'tool_name':
      return toolHandler(request.params.arguments);
    // ...
  }
});
```

## 하위 호환 필수

deprecated alias는 반드시 유지한다:

| Deprecated | 현재 | 비고 |
|-----------|------|------|
| `get_button_usage` | `get_component("Button")` | v0.1.0 호환 |
| `get_text_usage` | `get_component("Text")` | v0.1.0 호환 |
| `get_icon_usage` | `search_icons(keyword)` | v0.1.0 호환 |

deprecated 도구를 제거하지 않는다. 새 도구를 추가할 때 기존 도구 이름이 충돌하지 않는지 확인한다.

## 도구 구현 파일

`src/tools/` 디렉토리에 기능별 파일로 분리:

| 파일 | 도구 |
|------|------|
| `components.ts` | `getButtonUsage`, `getTextUsage`, `getIconUsage` (deprecated) |
| `components-v2.ts` | `listComponents`, `getComponent` |
| `design-check.ts` | `getDesignCheckStatus`, `getDesignCheckMismatches` |
| `icons.ts` | `listIcons`, `searchIcons` |
| `discovery.ts` | `discoverTools` |
| `candidates.ts` | `getDsCandidates`, `registerDsCandidate` |
| `semantic-token.ts` | `getSemanticToken` |
| `tokens.ts` | `getToken` |
| `search.ts` | `searchDesignSystem` |

새 도구 추가 시: `src/tools/`에 파일 생성 → `index.ts`에서 import + 스키마 등록 + 핸들러 추가.

## 빌드

```bash
cd packages/mcp-server && npx tsc
```

빌드 후 `dist/` 디렉토리에 산출물이 생성되는지 확인한다.

## 테스트 (JSON-RPC stdin)

```bash
# 도구 목록
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | \
  node packages/mcp-server/dist/index.js 2>/dev/null

# 도구 호출
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"tool_name","arguments":{}}}' | \
  node packages/mcp-server/dist/index.js 2>/dev/null
```

새 도구 추가 후 반드시 위 패턴으로 동작 확인한다.

## 응답 형식

모든 도구 핸들러는 MCP SDK 형식을 따른다:

```typescript
return {
  content: [
    { type: 'text', text: '응답 텍스트' }
  ],
};
```

에러 시:

```typescript
return {
  content: [
    { type: 'text', text: '❌ 에러 메시지' }
  ],
  isError: true,
};
```

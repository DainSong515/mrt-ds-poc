"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const components_js_1 = require("./tools/components.js");
const tokens_js_1 = require("./tools/tokens.js");
const search_js_1 = require("./tools/search.js");
const semantic_token_js_1 = require("./tools/semantic-token.js");
const candidates_js_1 = require("./tools/candidates.js");
const server = new index_js_1.Server({
    name: 'myrealtrip-web-ui-mcp',
    version: '0.2.0',
}, {
    capabilities: {
        tools: {},
        prompts: {},
    },
});
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: [
            // 기존 4개 tool
            {
                name: 'get_button_usage',
                description: 'MyRealTrip Button 컴포넌트 사용법 반환. variant별 Props, 예시 코드, 주의사항 포함. 버튼 구현 시 반드시 호출.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        variant: {
                            type: 'string',
                            description: "조회할 variant. primary | primaryOpt | secondary | secondaryOpt | tertiary | tertiaryOpt | text. 생략 시 전체 반환.",
                        },
                        use_case: {
                            type: 'string',
                            description: "특정 케이스. 'loading' | 'icon' | 생략(기본)",
                        },
                    },
                },
            },
            {
                name: 'get_text_usage',
                description: 'MyRealTrip Text 컴포넌트 사용법 반환. typography 전체 목록, lineClamp 사용법 포함. 텍스트 구현 시 반드시 호출.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        use_case: {
                            type: 'string',
                            description: "특정 케이스. 'lineClamp' | 생략(기본)",
                        },
                    },
                },
            },
            {
                name: 'get_icon_usage',
                description: 'MyRealTrip Icon 컴포넌트 사용법 및 아이콘 검색. 아이콘 사용 시 반드시 호출. Button의 leftIcon/rightIcon prop에 전달할 아이콘 이름 확인.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        keyword: {
                            type: 'string',
                            description: "검색 키워드 (한글/영문). 예: '뒤로', '검색', 'arrow', 'search'. 생략 시 카테고리별 전체 목록 반환.",
                        },
                    },
                },
            },
            {
                name: 'get_token',
                description: 'MyRealTrip 디자인 토큰 조회. 색상(color), 그림자(shadow), 타이포그래피(typography) 토큰 값 반환. semantic/component 토큰도 포함.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: "토큰 이름 또는 키워드. 예: 'gray', 'blue.500', 'shadow.E200', 'headlineBold20', 'surface', 'button.primary'",
                        },
                    },
                    required: ['name'],
                },
            },
            // 신규 5개 tool
            {
                name: 'search_design_system',
                description: 'BM25 알고리즘으로 디자인 시스템 전체를 검색. 컴포넌트명/기능/사용 맥락으로 관련 문서 스니펫 반환. "로딩 버튼", "텍스트 말줄임" 같은 자연어 쿼리 가능.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: "검색 쿼리. 예: '로딩 버튼', '텍스트 말줄임', 'CTA 아이콘', '비활성화'",
                        },
                    },
                    required: ['query'],
                },
            },
            {
                name: 'get_semantic_token',
                description: '의미(intent) 기반으로 semantic/component 토큰 조회. "surface", "disabled", "CTA" 같은 의도로 검색. 직접 hex 사용 전 반드시 확인.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        intent: {
                            type: 'string',
                            description: "색상 의도 또는 컴포넌트 역할. 예: 'surface', 'content', 'disabled', 'primary', 'danger', 'CTA'",
                        },
                    },
                    required: ['intent'],
                },
            },
            {
                name: 'get_ds_candidates',
                description: '디자인 시스템 후보군 목록 반환. frontend-dubai에서 DS로 통합 예정인 컴포넌트 목록. 유사 컴포넌트 반복 구현 전 확인 권장.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            description: "필터. pending | in-progress | completed | rejected. 생략 시 전체 반환.",
                        },
                    },
                },
            },
            {
                name: 'register_ds_candidate',
                description: 'DS 후보군에 새 컴포넌트 등록. 유사 컴포넌트가 반복 구현된다고 판단될 때 호출. pending 상태로 등록되며 디자이너 협의 후 편입.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: "후보군 식별자 (kebab-case). 예: 'unified-tooltip', 'tab-bar'",
                        },
                        description: {
                            type: 'string',
                            description: "통합 제안 설명. 예: '3가지 Tooltip 컴포넌트 → placement 기반 단일 컴포넌트 통합 제안'",
                        },
                        sources: {
                            type: 'array',
                            items: { type: 'string' },
                            description: "중복으로 감지된 소스 파일 경로 목록. 예: ['tooltip/HoverTooltip.tsx', 'tooltip/ClickTooltip.tsx']",
                        },
                        similarity: {
                            type: 'number',
                            description: "유사도 (0~1). 생략 시 0.7. Props 구조가 얼마나 유사한지 추정값.",
                        },
                        notes: {
                            type: 'string',
                            description: "추가 메모. 통합 시 주의사항, 디자이너에게 전달할 내용 등.",
                        },
                    },
                    required: ['id', 'description', 'sources'],
                },
            },
        ],
    };
});
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    switch (name) {
        case 'get_button_usage': {
            const variant = args?.variant;
            const useCase = args?.use_case;
            return {
                content: [{ type: 'text', text: (0, components_js_1.getButtonUsage)(variant, useCase) }],
            };
        }
        case 'get_text_usage': {
            const useCase = args?.use_case;
            return {
                content: [{ type: 'text', text: (0, components_js_1.getTextUsage)(useCase) }],
            };
        }
        case 'get_icon_usage': {
            const keyword = args?.keyword;
            return {
                content: [{ type: 'text', text: (0, components_js_1.getIconUsage)(keyword) }],
            };
        }
        case 'get_token': {
            const tokenName = args?.name;
            return {
                content: [{ type: 'text', text: (0, tokens_js_1.getToken)(tokenName) }],
            };
        }
        case 'search_design_system': {
            const query = args?.query;
            return {
                content: [{ type: 'text', text: (0, search_js_1.searchDesignSystem)(query) }],
            };
        }
        case 'get_semantic_token': {
            const intent = args?.intent;
            return {
                content: [{ type: 'text', text: (0, semantic_token_js_1.getSemanticToken)(intent) }],
            };
        }
        case 'get_ds_candidates': {
            const status = args?.status;
            return {
                content: [{ type: 'text', text: (0, candidates_js_1.getDsCandidates)(status) }],
            };
        }
        case 'register_ds_candidate': {
            return {
                content: [{
                        type: 'text',
                        text: (0, candidates_js_1.registerDsCandidate)({
                            id: args?.id,
                            description: args?.description,
                            sources: args?.sources,
                            similarity: args?.similarity,
                            notes: args?.notes,
                        }),
                    }],
            };
        }
        default:
            return {
                content: [{ type: 'text', text: `알 수 없는 tool: ${name}` }],
                isError: true,
            };
    }
});
const PROMPTS = [
    {
        name: 'figma-to-component',
        description: 'Figma 디자인을 마이리얼트립 DS 컴포넌트 코드로 변환한다.',
        arguments: [
            {
                name: 'figma_url',
                description: 'Figma URL 또는 node-id (예: https://figma.com/design/xxx?node-id=123-456)',
                required: false,
            },
        ],
    },
    {
        name: 'check-duplicate',
        description: '현재 작업 중인 컴포넌트가 DS에 이미 있거나 후보군과 중복인지 확인하고, 필요시 후보군에 등록한다.',
        arguments: [
            {
                name: 'component_name',
                description: '확인할 컴포넌트 이름 또는 설명. 예: "Tooltip", "필터 칩", "탭바"',
                required: true,
            },
            {
                name: 'source_files',
                description: '중복으로 의심되는 소스 파일 경로 (쉼표 구분). 예: "tooltip/HoverTooltip.tsx, tooltip/ClickTooltip.tsx"',
                required: false,
            },
        ],
    },
];
server.setRequestHandler(types_js_1.ListPromptsRequestSchema, async () => {
    return { prompts: PROMPTS };
});
server.setRequestHandler(types_js_1.GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === 'figma-to-component') {
        const figmaUrl = args?.figma_url ?? '';
        const nodeIdInstruction = figmaUrl
            ? `node-id는 "${figmaUrl}"에서 추출한다. URL 형식이면 node-id= 파라미터를 파싱하고 -를 :로 변환한다.`
            : '현재 Figma에서 선택된 노드를 사용한다 (nodeId를 비워서 호출).';
        return {
            description: 'Figma 디자인을 마이리얼트립 DS 컴포넌트 코드로 변환한다.',
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Figma 디자인을 마이리얼트립 디자인 시스템 컴포넌트로 변환한다.

## 입력
${nodeIdInstruction}

## 실행 절차

### 1단계: Figma 디자인 분석
- mcp__figma__get_design_context 로 디자인 컨텍스트를 가져온다.
- 화면에서 다음을 파악한다:
  - 사용된 UI 요소 (버튼, 텍스트, 아이콘, 입력 등)
  - 색상 및 타이포그래피
  - 레이아웃 구조

### 2단계: 디자인 시스템 매핑
파악한 UI 요소별로 MCP tool을 호출한다:
- 버튼이 있으면 → get_button_usage 호출하여 올바른 variant 확인
- 텍스트가 있으면 → get_text_usage 호출하여 typography 확인
- 아이콘이 있으면 → get_icon_usage(keyword) 호출하여 아이콘 이름 확인
- 색상 의도가 불분명하면 → get_token(name) 호출하여 토큰 확인
- 전체적으로 관련 컴포넌트 파악 → search_design_system(query) 호출

### 3단계: 코드 생성
아래 규칙을 반드시 준수한다:

**금지 패턴:**
- <button> 일반 태그 직접 사용
- style={{ color: '#141719' }} 하드코딩 hex
- variant="solid", typography="body1" 등 존재하지 않는 값
- <Icon name="arrow-left" /> 잘못된 아이콘 이름 형식

**필수 패턴:**
- 버튼은 반드시 <Button variant="..."> 사용
- 텍스트는 반드시 <Text typography="..."> 사용
- 아이콘은 반드시 Ico + PascalCase (예: IcoArrowLeft)
- import: import { Button, Text, Icon } from '@myrealtrip/web-ui';

### 4단계: 결과 출력
다음 형식으로 출력한다:

## 사용한 MCP Tool
- get_button_usage(variant?) → [결과 요약]
- get_icon_usage(keyword) → [매핑된 아이콘]
- ...

## 생성된 컴포넌트
[TSX 코드]

## DS 매핑 결과
| Figma 요소 | 사용한 컴포넌트 | Props |
|-----------|----------------|-------|
| ... | ... | ... |
`,
                    },
                },
            ],
        };
    }
    if (name === 'check-duplicate') {
        const componentName = args?.component_name ?? '';
        const sourceFiles = args?.source_files ?? '';
        return {
            description: '컴포넌트 중복 여부 확인 및 DS 후보군 등록',
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `컴포넌트 "${componentName}"이 마이리얼트립 디자인 시스템에 이미 있거나 후보군과 중복인지 확인한다.
${sourceFiles ? `\n소스 파일: ${sourceFiles}` : ''}

## 실행 절차

### 1단계: 기존 DS 컴포넌트 확인
- search_design_system("${componentName}") 호출
- 이미 DS에 있는 컴포넌트인지 확인

### 2단계: 후보군 확인
- get_ds_candidates() 호출
- "${componentName}"과 유사한 후보군이 있는지 확인

### 3단계: 판단 및 행동
아래 기준으로 판단한다:

**케이스 A: DS에 이미 있음**
→ 기존 컴포넌트 사용법 안내 (get_button_usage 등 해당 tool 호출)
→ 새로 만들지 말 것

**케이스 B: 후보군에 이미 있음**
→ 후보군 현황 안내
→ 중복 구현 자제 권고
→ 후보군 담당자/디자이너와 협의 권장

**케이스 C: 없음 → 후보군 등록 필요**
→ register_ds_candidate 호출하여 등록
→ id: kebab-case로 변환 (예: "unified-${componentName.toLowerCase().replace(/\s+/g, '-')}")
→ sources: ${sourceFiles ? `["${sourceFiles.split(',').map((s) => s.trim()).join('", "')}"]` : '현재 작업 파일 경로'}
→ similarity: Props 구조 유사도 추정

### 4단계: 결과 출력

## 확인 결과
| 항목 | 결과 |
|------|------|
| DS 기존 컴포넌트 | 있음/없음 |
| 후보군 중복 | 있음/없음 |
| 권장 행동 | ... |

[케이스별 상세 안내]
`,
                    },
                },
            ],
        };
    }
    throw new Error(`알 수 없는 prompt: ${name}`);
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    process.stderr.write('MyRealTrip Web UI MCP 서버 시작됨 v0.2.0 (stdio)\n');
}
main().catch((error) => {
    process.stderr.write(`MCP 서버 오류: ${error}\n`);
    process.exit(1);
});

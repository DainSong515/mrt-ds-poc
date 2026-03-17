"use strict";
/**
 * icons.ts
 * list_icons / search_icons — 아이콘 전용 도구 (분리)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listIcons = listIcons;
exports.searchIcons = searchIcons;
const ICON_CATEGORIES = [
    {
        name: 'navigation',
        description: '방향, 이동 관련',
        icons: ['IcoArrowLeft', 'IcoArrowRight', 'IcoArrowUp', 'IcoArrowDown', 'IcoChevronLeft', 'IcoChevronRight', 'IcoChevronUp', 'IcoChevronDown', 'IcoBack', 'IcoForward', 'IcoRefresh', 'IcoExternalLink', 'IcoLink', 'IcoExpand'],
    },
    {
        name: 'action',
        description: '사용자 액션',
        icons: ['IcoSearch', 'IcoAdd', 'IcoClose', 'IcoDelete', 'IcoEdit', 'IcoShare', 'IcoDownload', 'IcoUpload', 'IcoFilter', 'IcoSort', 'IcoCopy', 'IcoSave'],
    },
    {
        name: 'content',
        description: '콘텐츠 표시',
        icons: ['IcoHeart', 'IcoHeartFilled', 'IcoBookmark', 'IcoBookmarkFilled', 'IcoStar', 'IcoStarFilled', 'IcoCheck', 'IcoCheckCircle', 'IcoInfo', 'IcoWarning'],
    },
    {
        name: 'communication',
        description: '알림, 메시지',
        icons: ['IcoNotification', 'IcoNotificationFilled', 'IcoMessage', 'IcoMessageFilled', 'IcoMail', 'IcoPhone'],
    },
    {
        name: 'travel',
        description: '여행 관련',
        icons: ['IcoFlight', 'IcoHotel', 'IcoCalendar', 'IcoLocationOn', 'IcoLocationOff', 'IcoMap', 'IcoCompass', 'IcoLuggage'],
    },
    {
        name: 'ui',
        description: 'UI 요소',
        icons: ['IcoMenu', 'IcoMore', 'IcoMoreVertical', 'IcoHome', 'IcoPerson', 'IcoSettings', 'IcoImage', 'IcoCamera', 'IcoEye', 'IcoEyeOff'],
    },
];
const SEARCH_HINTS = {
    '뒤로': ['IcoArrowLeft', 'IcoBack', 'IcoChevronLeft'],
    '검색': ['IcoSearch'],
    '닫기': ['IcoClose'],
    '삭제': ['IcoDelete', 'IcoClose'],
    '추가': ['IcoAdd'],
    '공유': ['IcoShare'],
    '좋아요': ['IcoHeart', 'IcoHeartFilled'],
    '즐겨찾기': ['IcoBookmark', 'IcoBookmarkFilled', 'IcoStar', 'IcoStarFilled'],
    '알림': ['IcoNotification', 'IcoNotificationFilled'],
    '메시지': ['IcoMessage', 'IcoMessageFilled'],
    '위치': ['IcoLocationOn', 'IcoMap'],
    '항공': ['IcoFlight'],
    '숙소': ['IcoHotel'],
    '캘린더': ['IcoCalendar'],
    '설정': ['IcoSettings'],
    '사람': ['IcoPerson'],
    '홈': ['IcoHome'],
    '필터': ['IcoFilter'],
    '정렬': ['IcoSort'],
    '수정': ['IcoEdit'],
    '다운로드': ['IcoDownload'],
    '메뉴': ['IcoMenu'],
    '더보기': ['IcoMore', 'IcoMoreVertical'],
};
function listIcons(category) {
    const lines = [
        '# MRT Design System Icons',
        '',
        `총 ${ICON_CATEGORIES.reduce((s, c) => s + c.icons.length, 0)}개 아이콘`,
        '',
        '## 네이밍 규칙',
        '- **Web**: `Ico` + PascalCase (예: `IcoArrowLeft`)',
        '- **iOS**: `ico_` + snake_case (예: `ico_arrow_left`)',
        '',
    ];
    const categories = category
        ? ICON_CATEGORIES.filter((c) => c.name === category)
        : ICON_CATEGORIES;
    if (category && categories.length === 0) {
        return `카테고리 "${category}"를 찾을 수 없습니다.\n\n사용 가능: ${ICON_CATEGORIES.map((c) => c.name).join(', ')}`;
    }
    for (const cat of categories) {
        lines.push(`### ${cat.name} — ${cat.description} (${cat.icons.length})`);
        lines.push(cat.icons.map((i) => `\`${i}\``).join(', '));
        lines.push('');
    }
    lines.push('## Import');
    lines.push('```tsx');
    lines.push("import { Icon } from '@myrealtrip/web-ui';");
    lines.push('<Icon name="IcoSearch" size={24} />');
    lines.push('```');
    return lines.join('\n');
}
function searchIcons(keyword) {
    const q = keyword.toLowerCase();
    const matched = new Set();
    // Korean hint search
    for (const [hint, icons] of Object.entries(SEARCH_HINTS)) {
        if (hint.includes(q) || q.includes(hint)) {
            icons.forEach((i) => matched.add(i));
        }
    }
    // Direct name search
    for (const cat of ICON_CATEGORIES) {
        for (const icon of cat.icons) {
            if (icon.toLowerCase().includes(q)) {
                matched.add(icon);
            }
        }
    }
    if (matched.size === 0) {
        return `"${keyword}" 에 대한 아이콘을 찾을 수 없습니다.\n\n전체 목록은 \`list_icons()\` 로 확인하세요.\n\n검색 힌트 (한글): ${Object.keys(SEARCH_HINTS).join(', ')}`;
    }
    const icons = [...matched];
    const lines = [
        `# Icon Search: "${keyword}"`,
        '',
        `${icons.length}개 결과:`,
        '',
        ...icons.map((icon) => {
            const cat = ICON_CATEGORIES.find((c) => c.icons.includes(icon));
            const iosName = 'ico_' + icon.replace('Ico', '').replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
            return `- \`${icon}\` (iOS: \`${iosName}\`) — ${cat?.name || 'unknown'}`;
        }),
        '',
        '## 사용법',
        '```tsx',
        `<Icon name="${icons[0]}" size={24} />`,
        '```',
    ];
    return lines.join('\n');
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLlmsFullTxt = exports.generateLlmsTxt = exports.bm25Search = exports.buildDefaultSearchIndex = exports.generateTokenDoc = exports.generateIconDoc = exports.generateTextDoc = exports.generateButtonDoc = void 0;
/**
 * ai-index 빌드 진입점
 * 실행 시 dist/ 산출물 생성
 */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const component_doc_generator_1 = require("./generators/component-doc.generator");
Object.defineProperty(exports, "generateButtonDoc", { enumerable: true, get: function () { return component_doc_generator_1.generateButtonDoc; } });
Object.defineProperty(exports, "generateTextDoc", { enumerable: true, get: function () { return component_doc_generator_1.generateTextDoc; } });
Object.defineProperty(exports, "generateIconDoc", { enumerable: true, get: function () { return component_doc_generator_1.generateIconDoc; } });
const token_doc_generator_1 = require("./generators/token-doc.generator");
Object.defineProperty(exports, "generateTokenDoc", { enumerable: true, get: function () { return token_doc_generator_1.generateTokenDoc; } });
const search_index_generator_1 = require("./generators/search-index.generator");
const llms_txt_generator_1 = require("./generators/llms-txt.generator");
const DIST_DIR = path_1.default.resolve(__dirname, '../dist');
const DOCS_DIR = path_1.default.join(DIST_DIR, 'docs');
function ensureDir(dir) {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
}
function writeFile(filePath, content) {
    fs_1.default.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Generated: ${path_1.default.relative(process.cwd(), filePath)}`);
}
async function build() {
    console.log('🔨 Building ai-index...\n');
    ensureDir(DIST_DIR);
    ensureDir(DOCS_DIR);
    // 컴포넌트 문서 생성
    const buttonDoc = (0, component_doc_generator_1.generateButtonDoc)();
    const chipDoc = (0, component_doc_generator_1.generateChipDoc)();
    const textDoc = (0, component_doc_generator_1.generateTextDoc)();
    const iconDoc = (0, component_doc_generator_1.generateIconDoc)();
    const tokenDoc = (0, token_doc_generator_1.generateTokenDoc)();
    writeFile(path_1.default.join(DOCS_DIR, 'button.md'), buttonDoc);
    writeFile(path_1.default.join(DOCS_DIR, 'chip.md'), chipDoc);
    writeFile(path_1.default.join(DOCS_DIR, 'text.md'), textDoc);
    writeFile(path_1.default.join(DOCS_DIR, 'icon.md'), iconDoc);
    writeFile(path_1.default.join(DOCS_DIR, 'tokens.md'), tokenDoc);
    // llms.txt 생성
    const llmsTxt = (0, llms_txt_generator_1.generateLlmsTxt)();
    writeFile(path_1.default.join(DIST_DIR, 'llms.txt'), llmsTxt);
    // llms-full.txt 생성 (모든 문서 포함)
    const llmsFullTxt = (0, llms_txt_generator_1.generateLlmsFullTxt)({
        button: buttonDoc,
        chip: chipDoc,
        text: textDoc,
        icon: iconDoc,
        tokens: tokenDoc,
    });
    writeFile(path_1.default.join(DIST_DIR, 'llms-full.txt'), llmsFullTxt);
    // 검색 인덱스 생성
    const searchIndex = (0, search_index_generator_1.buildDefaultSearchIndex)();
    writeFile(path_1.default.join(DIST_DIR, 'search-index.json'), JSON.stringify(searchIndex, null, 2));
    console.log('\n✨ ai-index build complete!');
    console.log(`   Output: ${DIST_DIR}`);
}
build().catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
var search_index_generator_2 = require("./generators/search-index.generator");
Object.defineProperty(exports, "buildDefaultSearchIndex", { enumerable: true, get: function () { return search_index_generator_2.buildDefaultSearchIndex; } });
Object.defineProperty(exports, "bm25Search", { enumerable: true, get: function () { return search_index_generator_2.bm25Search; } });
var llms_txt_generator_2 = require("./generators/llms-txt.generator");
Object.defineProperty(exports, "generateLlmsTxt", { enumerable: true, get: function () { return llms_txt_generator_2.generateLlmsTxt; } });
Object.defineProperty(exports, "generateLlmsFullTxt", { enumerable: true, get: function () { return llms_txt_generator_2.generateLlmsFullTxt; } });
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSearchIndex = loadSearchIndex;
exports.loadDocFile = loadDocFile;
exports.loadComponentDoc = loadComponentDoc;
/**
 * index-loader.ts
 * ai-index/dist/search-index.json 로더 (동적 로드)
 */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const AI_INDEX_DIST = path_1.default.resolve(__dirname, '../../../ai-index/dist');
let cachedIndex = null;
function loadSearchIndex() {
    if (cachedIndex)
        return cachedIndex;
    const indexPath = path_1.default.join(AI_INDEX_DIST, 'search-index.json');
    try {
        const content = fs_1.default.readFileSync(indexPath, 'utf-8');
        cachedIndex = JSON.parse(content);
        return cachedIndex;
    }
    catch {
        return null;
    }
}
function loadDocFile(docPath) {
    const fullPath = path_1.default.join(AI_INDEX_DIST, docPath);
    try {
        return fs_1.default.readFileSync(fullPath, 'utf-8');
    }
    catch {
        return null;
    }
}
function loadComponentDoc(componentName) {
    return loadDocFile(`docs/${componentName.toLowerCase()}.md`);
}

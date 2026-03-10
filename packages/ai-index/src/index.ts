/**
 * ai-index 빌드 진입점
 * 실행 시 dist/ 산출물 생성
 */
import fs from 'fs';
import path from 'path';

import { generateButtonDoc, generateChipDoc, generateTextDoc, generateIconDoc } from './generators/component-doc.generator';
import { generateTokenDoc } from './generators/token-doc.generator';
import { buildDefaultSearchIndex } from './generators/search-index.generator';
import { generateLlmsTxt, generateLlmsFullTxt } from './generators/llms-txt.generator';

const DIST_DIR = path.resolve(__dirname, '../dist');
const DOCS_DIR = path.join(DIST_DIR, 'docs');

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Generated: ${path.relative(process.cwd(), filePath)}`);
}

async function build(): Promise<void> {
  console.log('🔨 Building ai-index...\n');

  ensureDir(DIST_DIR);
  ensureDir(DOCS_DIR);

  // 컴포넌트 문서 생성
  const buttonDoc = generateButtonDoc();
  const chipDoc = generateChipDoc();
  const textDoc = generateTextDoc();
  const iconDoc = generateIconDoc();
  const tokenDoc = generateTokenDoc();

  writeFile(path.join(DOCS_DIR, 'button.md'), buttonDoc);
  writeFile(path.join(DOCS_DIR, 'chip.md'), chipDoc);
  writeFile(path.join(DOCS_DIR, 'text.md'), textDoc);
  writeFile(path.join(DOCS_DIR, 'icon.md'), iconDoc);
  writeFile(path.join(DOCS_DIR, 'tokens.md'), tokenDoc);

  // llms.txt 생성
  const llmsTxt = generateLlmsTxt();
  writeFile(path.join(DIST_DIR, 'llms.txt'), llmsTxt);

  // llms-full.txt 생성 (모든 문서 포함)
  const llmsFullTxt = generateLlmsFullTxt({
    button: buttonDoc,
    chip: chipDoc,
    text: textDoc,
    icon: iconDoc,
    tokens: tokenDoc,
  });
  writeFile(path.join(DIST_DIR, 'llms-full.txt'), llmsFullTxt);

  // 검색 인덱스 생성
  const searchIndex = buildDefaultSearchIndex();
  writeFile(
    path.join(DIST_DIR, 'search-index.json'),
    JSON.stringify(searchIndex, null, 2)
  );

  console.log('\n✨ ai-index build complete!');
  console.log(`   Output: ${DIST_DIR}`);
}

build().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});

export { generateButtonDoc, generateTextDoc, generateIconDoc, generateTokenDoc };
export { buildDefaultSearchIndex, bm25Search } from './generators/search-index.generator';
export { generateLlmsTxt, generateLlmsFullTxt } from './generators/llms-txt.generator';

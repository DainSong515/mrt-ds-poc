const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

// dist 디렉토리 생성
if (!fs.existsSync('dist')) fs.mkdirSync('dist');

// UI HTML 복사
fs.copyFileSync(
  path.join(__dirname, 'src/ui.html'),
  path.join(__dirname, 'dist/ui.html')
);

const buildOptions = {
  entryPoints: ['src/code.ts'],
  bundle: true,
  outfile: 'dist/code.js',
  target: 'es2017',
  platform: 'browser',
  format: 'iife',
  logLevel: 'info',
};

if (isWatch) {
  esbuild.context(buildOptions).then((ctx) => {
    ctx.watch();
    console.log('👀 watching...');
  });
} else {
  esbuild.build(buildOptions).then(() => {
    console.log('✅ Build complete: dist/code.js');
  }).catch(() => process.exit(1));
}

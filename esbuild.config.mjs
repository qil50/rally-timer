import { build } from 'esbuild';
import fs from 'fs/promises';
import path from 'path';

// استيراد الحزمة بصيغة CommonJS
import JSObfuscator from 'javascript-obfuscator';   // لاحظ الاسم

/* 1) تجميع وتصغير app.js */
await build({
  entryPoints: ['src/app.js'],
  outfile: 'dist/app.js',
  bundle: true,
  minify: true,
  target: ['es2018'],
  charset: 'utf8'
});

/* 2) تشويش الشفرة */
const js = await fs.readFile('dist/app.js', 'utf8');

const obfuscated = JSObfuscator.obfuscate(js, {
  compact: true,
  controlFlowFlattening: true,
  deadCodeInjection: true,
  numbersToExpressions: true,
  simplify: true,
  stringArray: true,
  stringArrayEncoding: ['rc4']
}).getObfuscatedCode();

await fs.writeFile('dist/app.js', obfuscated);

/* 3) نسخ HTML/CSS إلى dist */
await fs.mkdir('dist', { recursive: true });

let html = await fs.readFile('src/index.html', 'utf8');
html = html
  .replace('style.css', 'style.css')   // المسارات ثابتة
  .replace('app.js',    'app.js');

await fs.writeFile('dist/index.html', html);
await fs.copyFile('src/style.css', 'dist/style.css');

console.log('✅ Build finished');

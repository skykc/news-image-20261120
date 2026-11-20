// Render page.html to entry.png at exactly 1024x1024 with headless Chromium.
// Usage: node shot.mjs [out.png]  (default: entry.png)
// Deterministic: fixed viewport, no animations, no network, fonts from the system.
import puppeteer from '/home/hatch/workspace/makefun/shot-tools/node_modules/puppeteer/lib/puppeteer/puppeteer.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const repo = dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || join(repo, 'entry.png');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=1', '--hide-scrollbars'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 });
  await page.goto('file://' + join(repo, 'page.html'), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => ({
    scrollH: document.documentElement.scrollHeight,
    scrollW: document.documentElement.scrollWidth,
    bodyH: document.body.scrollHeight,
  }));
  console.log('overflow-check', JSON.stringify(overflow));
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1024, height: 1024 } });
  console.log('wrote', out);
} finally {
  await browser.close();
}

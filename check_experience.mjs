import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5176', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/exp1.png' });
await page.waitForTimeout(2600);
await page.screenshot({ path: '/tmp/exp2.png' });
await page.waitForTimeout(2600);
await page.screenshot({ path: '/tmp/exp3.png' });

const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
const clientHeight = await page.evaluate(() => document.documentElement.clientHeight);
console.log('scrollHeight', scrollHeight, 'clientHeight', clientHeight);

await browser.close();

// Renders scripts/og-card.html to og-image.png at exactly 1200x630 — the
// card iMessage, Slack, WhatsApp and friends display for a shared Movement
// link.
//
// The PNG is committed, so the app itself stays dependency-free; you only
// need this to regenerate the card after editing og-card.html:
//
//   npm i -D playwright && node scripts/make_og.js
//
// (This environment ships Chromium at /opt/pw-browsers/chromium; elsewhere,
// drop the executablePath and let Playwright use its own download.)

const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const exe = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium';
  const browser = await chromium.launch(
    require('fs').existsSync(exe) ? { executablePath: exe } : {}
  );
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto('file://' + path.resolve(__dirname, 'og-card.html'), {
    waitUntil: 'networkidle',
  });
  await page.waitForTimeout(300); // let fonts settle
  // JPEG, not PNG: this card is all gradient, and link-preview fetchers are
  // on a timer — a ~90KB file previews far more reliably than a ~575KB one.
  const out = path.resolve(__dirname, '..', 'og-image.jpg');
  await page.screenshot({ path: out, type: 'jpeg', quality: 90 });
  console.log('wrote', out);
  await browser.close();
})();

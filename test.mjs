import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-web-security'] });
  const page = await browser.newPage();
  
  await page.exposeFunction('logError', (msg, url, line, col, error) => {
    console.log(`B-ERROR: ${msg} at ${url}:${line}:${col}\nStack: ${error}`);
  });

  await page.evaluateOnNewDocument(() => {
    window.addEventListener('error', event => {
      window.logError(event.message, event.filename, event.lineno, event.colno, event.error ? event.error.stack : null);
    });
    window.addEventListener('unhandledrejection', event => {
      window.logError('Unhandled Rejection: ' + event.reason, '', '', '', event.reason ? event.reason.stack : null);
    });
  });

  page.on('pageerror', err => console.log('PAGE ERROR: ' + err.toString()));
  page.on('console', msg => {
      console.log('CONSOLE:', msg.type(), msg.text());
  });
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 5000 });
    const buttons = await page.$$('nav button');
    for (const btn of buttons) {
        await btn.click();
        await new Promise(r => setTimeout(r, 1000));
    }
  } catch (e) {
    console.log('Timeout', e.message);
  }
  await browser.close();
  process.exit(0);
})();

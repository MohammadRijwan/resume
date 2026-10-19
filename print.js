const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const htmlPath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
    console.log('Loading page:', htmlPath);
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });
    
    console.log('Generating PDF...');
    await page.pdf({
      path: 'Mohammad Rijwan - Resume.pdf',
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false
    });
    
    console.log('PDF generated successfully!');
    await browser.close();
  } catch (err) {
    console.error('Error details:', err);
    process.exit(1);
  }
})();

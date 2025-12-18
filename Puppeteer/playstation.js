import puppeteer from 'puppeteer';
import fs from 'fs';


async function scrapePlaystations() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');
  await page.goto('https://www.coolblue.be/nl/consoles/playstation5', { waitUntil: 'networkidle0' });

  const pageTitle = await page.$eval('.filtered-search__header h1', (element) => element.textContent.trim());

  const products = await page.$$eval('.product-card', (rows) => {
    return rows.map((row) => {
      const rawPrice = row.querySelector('.sales-price__current')?.textContent || '';

      return {
        productTitle: row.querySelector('.product-card__title').textContent.trim(),
        // ✅ Prijs correct geformatteerd met één replace (regex)
        price: parseFloat(rawPrice.replace(/[€.\s]/g, '').replace(',', '.')),

        availability: row.querySelector('.color--available')?.textContent.trim(),
      };
    });
  });

  const filteredProducts = products.filter((product) => product.price > 600);

  console.log(pageTitle);
  console.table(filteredProducts);


  const filePath = 'playstations.json';
  if (fs.existsSync(filePath)) {
    console.log('playstations.json bestaat al');
  }
  fs.writeFileSync(filePath, JSON.stringify(filteredProducts, null, 2));

  console.log('-----Resultaat opgeslagen in playstations.json------');

  await browser.close();
}

export { scrapePlaystations };

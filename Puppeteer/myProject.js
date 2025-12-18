import puppeteer from 'puppeteer';
import fs from 'fs';

async function scrapeMovies() {
    const genresToVisit = ['action', 'comedy'];
    const minDuration = 90; // minuten
    const maxDuration = 180;
    const minYear = 2000;
    const maxYear = 2025;

    const browser = await puppeteer.launch({
        headless: false,      // Browser zichtbaar
        slowMo: 50,           // Vertraging tussen acties (ms), handig om te volgen
        defaultViewport: null, // Optioneel: gebruik volledige schermgrootte
    });

    let allMovies = [];

    for (const genre of genresToVisit) {
        const page = await browser.newPage();

        // Anti-bot detectie
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        );

        const url = `https://www.imdb.com/chart/top/?ref_=int_nv_menu&genres=${genre}`;
        console.log(`-------Bezoek overzichtspagina voor genre: ${genre} ---------------`);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        const moviesOnPage = await page.$$eval('li.ipc-metadata-list-summary-item', (items) => {
            return items.map(item => {
                const titleElement = item.querySelector('h3');
                const ratingElement = item.querySelector('[data-testid="ratingGroup--imdb-rating"] span');
                const linkElement = item.querySelector('a.ipc-title-link-wrapper');
                const metadataSpans = item.querySelectorAll('.cli-title-metadata-item');


                const titleText = titleElement.textContent.trim().replace(/^\d+\.\s*/, '');

                // Jaar uit eerste metadata span
                const yearText = metadataSpans[0].textContent.trim();
                const year = parseInt(yearText) || null;

                // Speelduur uit tweede span
                const durationText = metadataSpans[1].textContent.trim();
                const match = durationText.match(/(\d+)h\s*(\d+)?m?/);
                const hours = parseInt(match?.[1] ?? 0);
                const minutes = parseInt(match?.[2] ?? 0);
                const durationMinutes = hours * 60 + minutes;


                const rating = parseFloat(ratingElement.textContent.trim());

                return {
                    title: titleText,
                    year: year,
                    durationMinutes: durationMinutes,
                    rating: rating,
                    link: linkElement.href
                };
            });
        });


        for (const movie of moviesOnPage) {
            movie.genre = genre;

            if (
                movie.durationMinutes >= minDuration &&
                movie.durationMinutes <= maxDuration &&
                movie.year >= minYear &&
                movie.year <= maxYear
            ) {
                allMovies.push(movie);
            }
        }

        console.log(`--------${moviesOnPage.length} films verwerkt voor genre ${genre}-----`);
        await page.close();
    }

    fs.writeFileSync('movies.json', JSON.stringify(allMovies, null, 2));
    console.log(`------${allMovies.length} films opgeslagen in movies.json-----`);

    await browser.close();
}

export { scrapeMovies };

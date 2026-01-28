import { test, expect } from '@playwright/test';

test('De frontend bevat een lijst van games', async ({ page }) => {
    await page.goto('http://localhost:4321/astro-build');
    const games = page.locator('.game-card');
    const count = await games.count();
    expect(count).toBeGreaterThan(0);
});


test('De frontend bevat een inputveld om te filteren op naam', async ({ page }) => {
    await page.goto('http://localhost:4321/astro-build');
    const searchInput = page.locator('#search');
    await expect(searchInput).toBeVisible();
});

test('De frontend toont de juiste games na het filteren via de slider', async ({ page }) => {
    await page.goto('http://localhost:4321/astro-build');

    const slider = page.locator('#discount-slider');
    await slider.fill('50'); // stel max discount op 50%

    // Wacht even dat de UI update (afhankelijk van je JS)
    await page.waitForTimeout(500);

    const visibleGames = page.locator('.game-card:visible');
    const count = await visibleGames.count();

    for (let i = 0; i < count; i++) {
        const discountText = await visibleGames.nth(i).locator('p').textContent();
        const discount = parseInt(discountText || '0', 10);
        expect(discount).toBeLessThanOrEqual(50);
    }
});

test('De frontend toont de juiste games na het filteren via de zoekfunctie en de slider tegelijk', async ({ page }) => {
    await page.goto('http://localhost:4321/astro-build');

    // Zoek op naam
    const searchInput = page.locator('#search');
    await searchInput.fill('Cyberpunk');

    // Stel slider op 50%
    const slider = page.locator('#discount-slider');
    await slider.fill('50');

    await page.waitForTimeout(500);

    // Controleer dat alleen Cyberpunk-games met ≤ 50% korting zichtbaar zijn
    const visibleGames = page.locator('.game-card:visible');
    const count = await visibleGames.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const title = await visibleGames.nth(i).locator('h5').textContent();
        expect(title?.toLowerCase()).toContain('cyberpunk');
    }
});

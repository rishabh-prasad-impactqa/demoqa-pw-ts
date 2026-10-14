import { Page } from '@playwright/test';

// DemoQA ke ads/footer clicks block karte hain, isliye CSS se hide karte hain
export async function hideAds(page: Page): Promise<void> {
  await page.addStyleTag({
    content: '#fixedban, footer, iframe, [id^="google_ads"], #adplus-anchor { display: none !important; }',
  });
}

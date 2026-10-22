import { expect, test } from '@playwright/test';
import { PlaywrightDriver } from '../drivers/PlaywrightDriver';

// Pass [primary, ...fallbacks] as a target: the driver uses the first selector that works,
// so a renamed id does not break the test.
test('uses fallback selectors when primary selectors no longer match', { tag: '@regression' }, async ({ page }) => {
  await page.setContent(`
    <button type="button" onclick="this.dataset.clicked = 'true'">Save</button>
    <label for="email">Email</label>
    <input id="email" />
  `);

  const ui = new PlaywrightDriver(page);
  await ui.click(['#missing-save', "//button[normalize-space()='Save']"]);
  await ui.type(['#missing-email', "//label[normalize-space()='Email']/following-sibling::input"], 'qa@example.com');

  await expect(page.getByRole('button', { name: 'Save', exact: true })).toHaveAttribute('data-clicked', 'true');
  await expect(page.locator('#email')).toHaveValue('qa@example.com');
});

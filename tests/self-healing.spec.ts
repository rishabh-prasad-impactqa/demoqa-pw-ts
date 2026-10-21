
import { expect, test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

class SelfHealingTestPage extends BasePage {
  protected readonly path = '';
  protected readonly title = '';

  async clickSave(): Promise<void> {
    await this.clickWithHealing(
      this.page.locator('#missing-save'),
      this.page.getByRole('button', { name: 'Save', exact: true }),
    );
  }

  async fillEmail(value: string): Promise<void> {
    await this.fillWithHealing(
      value,
      this.page.locator('#missing-email'),
      this.page.getByRole('textbox', { name: 'Email', exact: true }),
    );
  }
}

test('uses accessible fallback locators when primary selectors no longer match', { tag: '@regression' }, async ({ page }) => {
  await page.setContent(`
    <button type="button" onclick="this.dataset.clicked = 'true'">Save</button>
    <label for="email">Email</label>
    <input id="email" />
  `);

  const testPage = new SelfHealingTestPage(page);
  await testPage.clickSave();
  await testPage.fillEmail('qa@example.com');

  await expect(page.getByRole('button', { name: 'Save', exact: true })).toHaveAttribute('data-clicked', 'true');
  await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toHaveValue('qa@example.com');
});
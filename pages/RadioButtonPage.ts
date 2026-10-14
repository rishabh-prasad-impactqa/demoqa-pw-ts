import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RadioButtonPage extends BasePage {
  protected readonly path = '/radio-button';
  protected readonly title = 'Radio Button';

  async select(option: string): Promise<void> {
    await this.page.locator(`label[for="${option.toLowerCase()}Radio"]`).click();
  }

  async verifyResult(option: string): Promise<void> {
    await expect(this.page.locator('.text-success')).toHaveText(option);
  }
}

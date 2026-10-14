import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TextBoxData } from '../data/testData';

export class TextBoxPage extends BasePage {
  protected readonly path = '/text-box';
  protected readonly title = 'Text Box';

  async submitForm(d: TextBoxData): Promise<void> {
    await this.page.locator('#userName').fill(d.fullName);
    await this.page.locator('#userEmail').fill(d.email);
    await this.page.locator('#currentAddress').fill(d.currentAddress);
    await this.page.locator('#permanentAddress').fill(d.permanentAddress);
    await this.page.locator('#submit').click();
  }

  async verifyOutput(d: TextBoxData): Promise<void> {
    for (const value of [d.fullName, d.email, d.currentAddress, d.permanentAddress]) {
      await expect(this.page.locator('#output')).toContainText(value);
    }
  }
}

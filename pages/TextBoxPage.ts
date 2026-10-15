import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TextBoxData } from '../data/testData';

export class TextBoxPage extends BasePage {
  protected readonly path = '/text-box';
  protected readonly title = 'Text Box';

  async submitForm(d: TextBoxData): Promise<void> {
    await this.fillWithHealing(d.fullName, this.page.locator('#userName'), this.page.getByRole('textbox', { name: 'Full Name' }));
    await this.fillWithHealing(d.email, this.page.locator('#userEmail'), this.page.getByRole('textbox', { name: 'name@example.com' }));
    await this.fillWithHealing(d.currentAddress, this.page.locator('#currentAddress'), this.page.getByRole('textbox', { name: 'Current Address' }));
    await this.fillWithHealing(d.permanentAddress, this.page.locator('#permanentAddress'), this.page.getByRole('textbox', { name: 'Permanent Address' }));
    await this.clickWithHealing(this.page.locator('#submit'), this.page.getByRole('button', { name: 'Submit', exact: true }));
  }

  async verifyOutput(d: TextBoxData): Promise<void> {
    for (const value of [d.fullName, d.email, d.currentAddress, d.permanentAddress]) {
      await expect(this.page.locator('#output')).toContainText(value);
    }
  }
}

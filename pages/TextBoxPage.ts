import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TextBoxData } from '../data/testData';

export class TextBoxPage extends BasePage {
  protected readonly path = '/text-box';
  protected readonly title = 'Text Box';

  async submitForm(d: TextBoxData): Promise<void> {
    await this.ui.type(['#userName', "//input[@placeholder='Full Name']"], d.fullName);
    await this.ui.type(['#userEmail', "//input[@placeholder='name@example.com']"], d.email);
    await this.ui.type(['#currentAddress', "//textarea[@placeholder='Current Address']"], d.currentAddress);
    await this.ui.type(
      ['#permanentAddress', "//label[normalize-space()='Permanent Address']/following::textarea[1]"],
      d.permanentAddress,
    );
    await this.ui.click(['#submit', "//button[normalize-space()='Submit']"]);
  }

  async verifyOutput(d: TextBoxData): Promise<void> {
    for (const value of [d.fullName, d.email, d.currentAddress, d.permanentAddress]) {
      await expect(this.page.locator('#output')).toContainText(value);
    }
  }
}

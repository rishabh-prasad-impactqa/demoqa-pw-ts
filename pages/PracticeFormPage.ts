import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { PracticeFormData } from '../data/testData';

export class PracticeFormPage extends BasePage {
  protected readonly path = '/automation-practice-form';
  protected readonly title = 'Practice Form';

  async fillForm(d: PracticeFormData): Promise<void> {
    await this.ui.type(['#firstName', "//input[@placeholder='First Name']"], d.firstName);
    await this.ui.type(['#lastName', "//input[@placeholder='Last Name']"], d.lastName);
    await this.ui.type(['#userEmail', "//input[@placeholder='name@example.com']"], d.email);
    await this.ui.click([
      `//div[@id='genterWrapper']//label[normalize-space()='${d.gender}']`,
      `//label[normalize-space()='${d.gender}']`,
    ]);
    await this.ui.type(['#userNumber', "//input[@placeholder='Mobile Number']"], d.mobile);

    await this.ui.type(['#subjectsInput', "//div[@id='subjectsContainer']//input"], d.subject);
    await this.ui.click([
      `(//div[contains(@class,'subjects-auto-complete__option')][contains(.,'${d.subject}')])[1]`,
      `(//*[normalize-space(text())='${d.subject}'])[last()]`,
    ]);
    await this.ui.click([
      `//div[@id='hobbiesWrapper']//label[normalize-space()='${d.hobby}']`,
      `//label[normalize-space()='${d.hobby}']`,
    ]);

    await this.ui.type(['#currentAddress', "//textarea[@placeholder='Current Address']"], d.address);
    await this.ui.click(['#state', "//div[text()='Select State']"]);
    await this.ui.click([`//div[@id='stateCity-wrapper']//div[text()='${d.state}']`, `//*[text()='${d.state}']`]);
    await this.ui.click(['#city', "//div[text()='Select City']"]);
    await this.ui.click([`//div[@id='stateCity-wrapper']//div[text()='${d.city}']`, `//*[text()='${d.city}']`]);
    await this.ui.click(['#submit', "//button[normalize-space()='Submit']"]);
  }

  async verifyAndCloseModal(d: PracticeFormData): Promise<void> {
    await expect(this.page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
    const values = [`${d.firstName} ${d.lastName}`, d.email, d.gender, d.mobile, d.subject, d.hobby, `${d.state} ${d.city}`];
    for (const value of values) {
      await expect(this.page.locator('.modal-body')).toContainText(value);
    }
    await this.ui.click(['#closeLargeModal', "//button[normalize-space()='Close']"]);
  }
}

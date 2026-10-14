import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { PracticeFormData } from '../data/testData';

export class PracticeFormPage extends BasePage {
  protected readonly path = '/automation-practice-form';
  protected readonly title = 'Practice Form';

  async fillForm(d: PracticeFormData): Promise<void> {
    await this.page.locator('#firstName').fill(d.firstName);
    await this.page.locator('#lastName').fill(d.lastName);
    await this.page.locator('#userEmail').fill(d.email);
    // exact: true zaroori hai, warna "Male" text "Female" se bhi match ho jata hai
    await this.page.locator('#genterWrapper').getByText(d.gender, { exact: true }).click();
    await this.page.locator('#userNumber').fill(d.mobile);

    await this.page.locator('#subjectsInput').fill(d.subject);
    await this.page.locator('.subjects-auto-complete__option', { hasText: d.subject }).first().click();
    await this.page.locator('#hobbiesWrapper').getByText(d.hobby, { exact: true }).click();

    await this.page.locator('#currentAddress').fill(d.address);
    await this.page.locator('#state').click();
    await this.page.locator('#stateCity-wrapper').getByText(d.state, { exact: true }).click();
    await this.page.locator('#city').click();
    await this.page.locator('#stateCity-wrapper').getByText(d.city, { exact: true }).click();
    await this.page.locator('#submit').click();
  }

  async verifyAndCloseModal(d: PracticeFormData): Promise<void> {
    await expect(this.page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
    const values = [`${d.firstName} ${d.lastName}`, d.email, d.gender, d.mobile, d.subject, d.hobby, `${d.state} ${d.city}`];
    for (const value of values) {
      await expect(this.page.locator('.modal-body')).toContainText(value);
    }
    await this.page.locator('#closeLargeModal').click();
// delete this line: await expect(this.page.locator('.modal-content')).toBeHidden();
  }
}

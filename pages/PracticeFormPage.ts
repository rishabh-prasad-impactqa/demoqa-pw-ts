import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { PracticeFormData } from '../data/testData';

export class PracticeFormPage extends BasePage {
  protected readonly path = '/automation-practice-form';
  protected readonly title = 'Practice Form';

  async fillForm(d: PracticeFormData): Promise<void> {
    await this.fillWithHealing(d.firstName, this.page.locator('#firstName'), this.page.getByRole('textbox', { name: 'First Name' }));
    await this.fillWithHealing(d.lastName, this.page.locator('#lastName'), this.page.getByRole('textbox', { name: 'Last Name' }));
    await this.fillWithHealing(d.email, this.page.locator('#userEmail'), this.page.getByRole('textbox', { name: 'name@example.com' }));
    await this.clickWithHealing(
      this.page.locator('#genterWrapper').getByText(d.gender, { exact: true }),
      this.page.getByText(d.gender, { exact: true }),
    );
    await this.fillWithHealing(d.mobile, this.page.locator('#userNumber'), this.page.getByRole('textbox', { name: 'Mobile Number' }));

    await this.fillWithHealing(d.subject, this.page.locator('#subjectsInput'), this.page.getByRole('textbox', { name: 'Subjects' }));
    await this.clickWithHealing(
      this.page.locator('.subjects-auto-complete__option', { hasText: d.subject }).first(),
      this.page.getByText(d.subject, { exact: true }),
    );
    await this.clickWithHealing(
      this.page.locator('#hobbiesWrapper').getByText(d.hobby, { exact: true }),
      this.page.getByText(d.hobby, { exact: true }),
    );

    await this.fillWithHealing(d.address, this.page.locator('#currentAddress'), this.page.getByRole('textbox', { name: 'Current Address' }));
    await this.clickWithHealing(this.page.locator('#state'), this.page.getByText('Select State', { exact: true }));
    await this.clickWithHealing(
      this.page.locator('#stateCity-wrapper').getByText(d.state, { exact: true }),
      this.page.getByText(d.state, { exact: true }),
    );
    await this.clickWithHealing(this.page.locator('#city'), this.page.getByText('Select City', { exact: true }));
    await this.clickWithHealing(
      this.page.locator('#stateCity-wrapper').getByText(d.city, { exact: true }),
      this.page.getByText(d.city, { exact: true }),
    );
    await this.clickWithHealing(this.page.locator('#submit'), this.page.getByRole('button', { name: 'Submit', exact: true }));
  }

  async verifyAndCloseModal(d: PracticeFormData): Promise<void> {
    await expect(this.page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
    const values = [`${d.firstName} ${d.lastName}`, d.email, d.gender, d.mobile, d.subject, d.hobby, `${d.state} ${d.city}`];
    for (const value of values) {
      await expect(this.page.locator('.modal-body')).toContainText(value);
    }
    await this.clickWithHealing(this.page.locator('#closeLargeModal'), this.page.getByRole('button', { name: 'Close', exact: true }));
  }
}

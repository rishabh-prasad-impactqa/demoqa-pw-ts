import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { WebTableData } from '../data/testData';

export class WebTablesPage extends BasePage {
  protected readonly path = '/webtables';
  protected readonly title = 'Web Tables';

  async addRecord(d: WebTableData): Promise<void> {
    await this.clickWithHealing(this.page.locator('#addNewRecordButton'), this.page.getByRole('button', { name: 'Add', exact: true }));
    await this.fillWithHealing(d.firstName, this.page.locator('#firstName'), this.page.getByRole('textbox', { name: 'First Name' }));
    await this.fillWithHealing(d.lastName, this.page.locator('#lastName'), this.page.getByRole('textbox', { name: 'Last Name' }));
    await this.fillWithHealing(d.email, this.page.locator('#userEmail'), this.page.getByRole('textbox', { name: 'name@example.com' }));
    await this.fillWithHealing(d.age, this.page.locator('#age'), this.page.getByRole('textbox', { name: 'Age' }));
    await this.fillWithHealing(d.salary, this.page.locator('#salary'), this.page.getByRole('textbox', { name: 'Salary' }));
    await this.fillWithHealing(d.department, this.page.locator('#department'), this.page.getByRole('textbox', { name: 'Department' }));
    await this.clickWithHealing(this.page.locator('#submit'), this.page.getByRole('button', { name: 'Submit', exact: true }));
  }

  async verifyRecord(d: WebTableData): Promise<void> {
    for (const value of [d.firstName, d.lastName, d.email, d.age, d.salary, d.department]) {
      await expect(this.page.getByText(value, { exact: true })).toBeVisible();
    }
  }
}

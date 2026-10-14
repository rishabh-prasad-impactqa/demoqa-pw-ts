import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { WebTableData } from '../data/testData';

export class WebTablesPage extends BasePage {
  protected readonly path = '/webtables';
  protected readonly title = 'Web Tables';

  async addRecord(d: WebTableData): Promise<void> {
    await this.page.locator('#addNewRecordButton').click();
    await this.page.locator('#firstName').fill(d.firstName);
    await this.page.locator('#lastName').fill(d.lastName);
    await this.page.locator('#userEmail').fill(d.email);
    await this.page.locator('#age').fill(d.age);
    await this.page.locator('#salary').fill(d.salary);
    await this.page.locator('#department').fill(d.department);
    await this.page.locator('#submit').click();
  }

 async verifyRecord(d: WebTableData): Promise<void> {
  for (const value of [d.firstName, d.lastName, d.email, d.age, d.salary, d.department]) {
    await expect(this.page.getByText(value, { exact: true })).toBeVisible();
  }
}
}

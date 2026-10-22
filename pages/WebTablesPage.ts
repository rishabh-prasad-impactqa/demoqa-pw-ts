import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { WebTableData } from '../data/testData';

export class WebTablesPage extends BasePage {
  protected readonly path = '/webtables';
  protected readonly title = 'Web Tables';

  async addRecord(d: WebTableData): Promise<void> {
    await this.ui.click(['#addNewRecordButton', "//button[normalize-space()='Add']"]);
    await this.ui.type(['#firstName', "//input[@placeholder='First Name']"], d.firstName);
    await this.ui.type(['#lastName', "//input[@placeholder='Last Name']"], d.lastName);
    await this.ui.type(['#userEmail', "//input[@placeholder='name@example.com']"], d.email);
    await this.ui.type(['#age', "//input[@placeholder='Age']"], d.age);
    await this.ui.type(['#salary', "//input[@placeholder='Salary']"], d.salary);
    await this.ui.type(['#department', "//input[@placeholder='Department']"], d.department);
    await this.ui.click(['#submit', "//button[normalize-space()='Submit']"]);
  }

  async verifyRecord(d: WebTableData): Promise<void> {
    for (const value of [d.firstName, d.lastName, d.email, d.age, d.salary, d.department]) {
      await expect(this.page.getByText(value, { exact: true })).toBeVisible();
    }
  }
}

import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TabsPage extends BasePage {
  protected readonly path = '/tabs';
  protected readonly title = 'Tabs';

  async openTab(tab: string): Promise<void> {
    await this.ui.click([`#demo-tab-${tab}`, `//a[@role='tab'][contains(@id,'${tab}')]`]);
  }

  async verifyContent(tab: string, expected: string): Promise<void> {
    await expect(this.page.locator(`#demo-tabpane-${tab}`)).toContainText(expected);
  }
}

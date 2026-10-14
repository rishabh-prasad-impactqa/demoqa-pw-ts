import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckBoxData } from '../data/testData';

export class CheckBoxPage extends BasePage {
  protected readonly path = '/checkbox';
  protected readonly title = 'Check Box';

  async selectNode(d: CheckBoxData): Promise<void> {
    // Expand Home using its expand arrow, so Desktop and Downloads become visible
    await this.page.getByRole('treeitem', { name: 'Home' }).locator('.rc-tree-switcher').click();

    // Tick the node's checkbox, e.g. "Select Desktop"
    await this.page.getByRole('checkbox', { name: `Select ${d.node}` }).click();
  }

  async verifyResult(d: CheckBoxData): Promise<void> {
    for (const item of d.expected) {
      await expect(this.page.locator('#result')).toContainText(item);
    }
  }
}
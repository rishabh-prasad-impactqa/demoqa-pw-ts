import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckBoxData } from '../data/testData';

export class CheckBoxPage extends BasePage {
  protected readonly path = '/checkbox';
  protected readonly title = 'Check Box';

  async selectNode(d: CheckBoxData): Promise<void> {
    // Expand Home so Desktop and Downloads become visible.
    // NOTE: "role=..." and "text=..." are Playwright selector engines (they read accessible names, which CSS/XPath can't).
    // With another tool, swap these two for XPath.
    await this.ui.click([
      'role=treeitem[name="Home"] >> .rc-tree-switcher',
      'text="Home" >> xpath=.. >> .rc-tree-switcher',
    ]);
    // Tick the node's checkbox, e.g. "Select Desktop"
    await this.ui.click([`role=checkbox[name="Select ${d.node}"]`, `//*[@aria-label='Select ${d.node}']`]);
  }

  async verifyResult(d: CheckBoxData): Promise<void> {
    for (const item of d.expected) {
      await expect(this.page.locator('#result')).toContainText(item);
    }
  }
}

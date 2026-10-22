import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { SelectMenuData } from '../data/testData';

export class SelectMenuPage extends BasePage {
  protected readonly path = '/select-menu';
  protected readonly title = 'Select Menu';

  async chooseColour(d: SelectMenuData): Promise<void> {
    await this.ui.select('#oldSelectMenu', d.option);
  }

  async verifyColour(d: SelectMenuData): Promise<void> {
    await expect(this.page.locator('#oldSelectMenu option:checked')).toHaveText(d.option);
  }
}

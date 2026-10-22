import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RadioButtonPage extends BasePage {
  protected readonly path = '/radio-button';
  protected readonly title = 'Radio Button';

  // The real <input> is invisible and covered by its <label>.
  // Default: click the label. force=true: forceClick the input itself.
  async select(option: string, force = false): Promise<void> {
    const id = `${option.toLowerCase()}Radio`;
    if (force) await this.ui.forceClick(`#${id}`);
    else await this.ui.click([`label[for="${id}"]`, `//label[normalize-space()='${option}']`]);
  }

  async verifyResult(option: string): Promise<void> {
    await expect(this.page.locator('.text-success')).toHaveText(option);
  }
}

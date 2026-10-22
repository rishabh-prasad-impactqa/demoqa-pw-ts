import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ButtonsData } from '../data/testData';

type ClickKind = ButtonsData['action'];

// Which button for each kind of click, and where DemoQA prints the result
const BUTTONS: Record<ClickKind, { button: string; message: string }> = {
  double: { button: '#doubleClickBtn', message: '#doubleClickMessage' },
  right: { button: '#rightClickBtn', message: '#rightClickMessage' },
  click: { button: "//button[normalize-space()='Click Me']", message: '#dynamicClickMessage' },
};

export class ButtonsPage extends BasePage {
  protected readonly path = '/buttons';
  protected readonly title = 'Buttons';

  async performClick(kind: ClickKind): Promise<void> {
    const { button } = BUTTONS[kind];
    if (kind === 'double') await this.ui.doubleClick(button);
    else if (kind === 'right') await this.ui.rightClick(button);
    else await this.ui.click(button);
  }

  async verifyMessage(d: ButtonsData): Promise<void> {
    await expect(this.page.locator(BUTTONS[d.action].message)).toHaveText(d.expected);
  }
}

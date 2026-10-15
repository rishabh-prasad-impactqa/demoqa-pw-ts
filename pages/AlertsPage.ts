import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AlertsPage extends BasePage {
  protected readonly path = '/alerts';
  protected readonly title = 'Alerts';

  async respondToConfirm(accept: boolean): Promise<void> {
    // dialog handler click se PEHLE lagana padta hai
    this.page.once('dialog', (dialog) => (accept ? dialog.accept() : dialog.dismiss()));
    await this.clickWithHealing(
      this.page.locator('#confirmButton'),
      this.page.getByRole('button', { name: 'Click me', exact: true }).nth(2),
    );
  }

  async verifyConfirmResult(expected: string): Promise<void> {
    await expect(this.page.locator('#confirmResult')).toHaveText(expected);
  }
}

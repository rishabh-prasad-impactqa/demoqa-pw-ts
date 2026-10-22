import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AlertsPage extends BasePage {
  protected readonly path = '/alerts';
  protected readonly title = 'Alerts';

  /** Opens the confirm box, accepts or dismisses it, and returns the text the alert showed. */
  async respondToConfirm(accept: boolean): Promise<string> {
    const openConfirm = () => this.ui.click(['#confirmButton', "(//button[normalize-space()='Click me'])[3]"]);
    return accept ? this.ui.acceptAlert(openConfirm) : this.ui.dismissAlert(openConfirm);
  }

  verifyAlertMessage(actual: string, expected: string): void {
    expect(actual, 'confirm box message').toBe(expected);
  }

  async verifyConfirmResult(expected: string): Promise<void> {
    await expect(this.page.locator('#confirmResult')).toHaveText(expected);
  }
}

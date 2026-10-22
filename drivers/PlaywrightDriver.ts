import { Locator, Page } from '@playwright/test';
import { Target, UIActions } from '../core/UIActions';

/** Playwright implementation of UIActions. The only file that knows how each action is done in Playwright. */
export class PlaywrightDriver implements UIActions {
  constructor(private readonly page: Page) {}

  async navigate(url: string): Promise<void> {
    this.log('navigate', url);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async click(target: Target): Promise<void> {
    this.log('click', target);
    await (await this.find(target)).click();
  }

  async forceClick(target: Target): Promise<void> {
    this.log('forceClick', target);
    await (await this.find(target, false)).click({ force: true });
  }

  async doubleClick(target: Target): Promise<void> {
    this.log('doubleClick', target);
    await (await this.find(target)).dblclick();
  }

  async rightClick(target: Target): Promise<void> {
    this.log('rightClick', target);
    await (await this.find(target)).click({ button: 'right' });
  }

  async type(target: Target, text: string): Promise<void> {
    this.log('type', target, text);
    await (await this.find(target)).fill(text);
  }

  async pressKey(key: string): Promise<void> {
    this.log('pressKey', key);
    await this.page.keyboard.press(key);
  }

  async select(target: Target, optionText: string): Promise<void> {
    this.log('select', target, optionText);
    await (await this.find(target)).selectOption({ label: optionText });
  }

  async dragAndDrop(source: Target, destination: Target): Promise<void> {
    this.log('dragAndDrop', source, `=> ${destination}`);
    const from = await this.find(source);
    const to = await this.find(destination);
    await from.scrollIntoViewIfNeeded();
    const a = await from.boundingBox();
    const b = await to.boundingBox();
    if (!a || !b) throw new Error('dragAndDrop: could not find the source or destination on screen');

    // Real mouse path in small steps: works for HTML5 drag-and-drop and for libraries like jQuery UI
    await this.page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(a.x + a.width / 2 + 5, a.y + a.height / 2 + 5);
    await this.page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 15 });
    await this.page.mouse.up();
  }

  async acceptAlert(trigger: () => Promise<void>): Promise<string> {
    return this.answerAlert(true, trigger);
  }

  async dismissAlert(trigger: () => Promise<void>): Promise<string> {
    return this.answerAlert(false, trigger);
  }

  // Playwright needs the dialog listener BEFORE the click that opens the alert, so we set it up first
  private async answerAlert(accept: boolean, trigger: () => Promise<void>): Promise<string> {
    this.log(accept ? 'acceptAlert' : 'dismissAlert');
    const answered = this.page.waitForEvent('dialog', { timeout: 5000 }).then(async (dialog) => {
      const message = dialog.message();
      await (accept ? dialog.accept() : dialog.dismiss());
      return message;
    });
    answered.catch(() => undefined); // no unhandled error if the trigger itself fails first
    await trigger();
    return answered;
  }

  /**
   * Turns a Target into a Locator. With [primary, ...fallbacks] it uses the first selector that matches
   * exactly one visible, usable element (self-healing). `needVisible=false` is for forceClick on hidden inputs.
   */
  private async find(target: Target, needVisible = true): Promise<Locator> {
    const selectors = Array.isArray(target) ? target : [target];
    if (selectors.length === 1) return this.page.locator(selectors[0]); // no probing, Playwright auto-waits

    for (let i = 0; i < selectors.length; i += 1) {
      const candidate = this.page.locator(selectors[i]);
      if (await candidate.count() !== 1) continue;
      if (needVisible && !(await candidate.isVisible() && await candidate.isEnabled())) continue;
      if (i > 0) console.warn(`[self-healing] "${selectors[0]}" failed, used "${selectors[i]}"`);
      return candidate;
    }
    return this.page.locator(selectors[0]); // nothing worked: fail with Playwright's normal error
  }

  private log(action: string, target?: Target, extra = ''): void {
    const where = Array.isArray(target) ? target[0] : target ?? '';
    console.log(`[ACTION] ${action} ${where} ${extra}`.trim());
  }
}

import { Locator, Page, expect } from '@playwright/test';
import { hideAds } from '../utils/helpers';

export abstract class BasePage {
  protected abstract readonly path: string;
  protected abstract readonly title: string;

  constructor(protected readonly page: Page) {}

  protected async clickWithHealing(primary: Locator, ...fallbacks: Locator[]): Promise<void> {
    const locator = await this.resolveActionableLocator('click', [primary, ...fallbacks]);
    await locator.click();
  }

  protected async fillWithHealing(value: string, primary: Locator, ...fallbacks: Locator[]): Promise<void> {
    const locator = await this.resolveActionableLocator('fill', [primary, ...fallbacks]);
    await locator.fill(value);
  }

  private async resolveActionableLocator(
    action: 'click' | 'fill',
    candidates: Locator[],
  ): Promise<Locator> {
    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (await candidate.count() !== 1 || !(await candidate.isVisible())) {
        continue;
      }
 
      const isActionable = action === 'click'
        ? await candidate.isEnabled()
        : await candidate.isEditable();
      if (!isActionable) {
        continue;
      }

      if (index > 0) {
        console.warn(`[self-healing] ${action} used fallback locator: ${candidate}`);
      }
      return candidate;
    }

    return candidates[0];
  }

  async open(): Promise<void> {
    await this.page.goto(`https://demoqa.com${this.path}`, { waitUntil: 'domcontentloaded' });
    await hideAds(this.page);
    await expect(this.page.locator('h1.text-center')).toHaveText(this.title);
  }
}

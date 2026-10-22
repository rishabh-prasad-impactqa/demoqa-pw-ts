import { Page, expect } from '@playwright/test';
import { UIActions } from '../core/UIActions';
import { hideAds } from '../utils/helpers';

// Actions go through `ui` (tool-agnostic). Checks still use Playwright's expect on `page`.
export abstract class BasePage {
  protected abstract readonly path: string;
  protected abstract readonly title: string;

  constructor(
    protected readonly page: Page,
    protected readonly ui: UIActions,
  ) {}

  async open(): Promise<void> {
    await this.ui.navigate(`https://demoqa.com${this.path}`);
    await hideAds(this.page);
    await expect(this.page.locator('h1.text-center')).toHaveText(this.title);
  }
}

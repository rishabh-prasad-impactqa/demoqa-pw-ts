import { Page, expect } from '@playwright/test';
import { hideAds } from '../utils/helpers';

// Har page ke liye common open() yahin hai, child class sirf path aur title deti hai
export abstract class BasePage {
  protected abstract readonly path: string;
  protected abstract readonly title: string;

  constructor(protected readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(`https://demoqa.com${this.path}`, { waitUntil: 'domcontentloaded' });
    await hideAds(this.page);
    await expect(this.page.locator('h1.text-center')).toHaveText(this.title);
  }
}

import { test as base } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { CheckBoxPage } from '../pages/CheckBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { AlertsPage } from '../pages/AlertsPage';
import { TabsPage } from '../pages/TabsPage';

type Pages = {
  textBoxPage: TextBoxPage;
  practiceFormPage: PracticeFormPage;
  checkBoxPage: CheckBoxPage;
  radioButtonPage: RadioButtonPage;
  webTablesPage: WebTablesPage;
  alertsPage: AlertsPage;
  tabsPage: TabsPage;
};

// Har fixture page object banata hai aur open() bhi kar deta hai, isliye tests me open() nahi likhna padta
export const test = base.extend<Pages>({
  textBoxPage: async ({ page }, use) => { const p = new TextBoxPage(page); await p.open(); await use(p); },
  practiceFormPage: async ({ page }, use) => { const p = new PracticeFormPage(page); await p.open(); await use(p); },
  checkBoxPage: async ({ page }, use) => { const p = new CheckBoxPage(page); await p.open(); await use(p); },
  radioButtonPage: async ({ page }, use) => { const p = new RadioButtonPage(page); await p.open(); await use(p); },
  webTablesPage: async ({ page }, use) => { const p = new WebTablesPage(page); await p.open(); await use(p); },
  alertsPage: async ({ page }, use) => { const p = new AlertsPage(page); await p.open(); await use(p); },
  tabsPage: async ({ page }, use) => { const p = new TabsPage(page); await p.open(); await use(p); },
});

export { expect } from '@playwright/test';

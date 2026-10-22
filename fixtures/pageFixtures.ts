import { test as base } from '@playwright/test';
import { UIActions } from '../core/UIActions';
import { PlaywrightDriver } from '../drivers/PlaywrightDriver';
import { TextBoxPage } from '../pages/TextBoxPage';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { CheckBoxPage } from '../pages/CheckBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { AlertsPage } from '../pages/AlertsPage';
import { TabsPage } from '../pages/TabsPage';
import { DroppablePage } from '../pages/DroppablePage';
import { SelectMenuPage } from '../pages/SelectMenuPage';
import { ButtonsPage } from '../pages/ButtonsPage';

type Fixtures = {
  ui: UIActions;
  textBoxPage: TextBoxPage;
  practiceFormPage: PracticeFormPage;
  checkBoxPage: CheckBoxPage;
  radioButtonPage: RadioButtonPage;
  webTablesPage: WebTablesPage;
  alertsPage: AlertsPage;
  tabsPage: TabsPage;
  droppablePage: DroppablePage;
  selectMenuPage: SelectMenuPage;
  buttonsPage: ButtonsPage;
};

// `ui` is the one driver every page object uses. To run on another tool, return a different UIActions here.
export const test = base.extend<Fixtures>({
  ui: async ({ page }, use) => { await use(new PlaywrightDriver(page)); },

  textBoxPage: async ({ page, ui }, use) => { const p = new TextBoxPage(page, ui); await p.open(); await use(p); },
  practiceFormPage: async ({ page, ui }, use) => { const p = new PracticeFormPage(page, ui); await p.open(); await use(p); },
  checkBoxPage: async ({ page, ui }, use) => { const p = new CheckBoxPage(page, ui); await p.open(); await use(p); },
  radioButtonPage: async ({ page, ui }, use) => { const p = new RadioButtonPage(page, ui); await p.open(); await use(p); },
  webTablesPage: async ({ page, ui }, use) => { const p = new WebTablesPage(page, ui); await p.open(); await use(p); },
  alertsPage: async ({ page, ui }, use) => { const p = new AlertsPage(page, ui); await p.open(); await use(p); },
  tabsPage: async ({ page, ui }, use) => { const p = new TabsPage(page, ui); await p.open(); await use(p); },
  droppablePage: async ({ page, ui }, use) => { const p = new DroppablePage(page, ui); await p.open(); await use(p); },
  selectMenuPage: async ({ page, ui }, use) => { const p = new SelectMenuPage(page, ui); await p.open(); await use(p); },
  buttonsPage: async ({ page, ui }, use) => { const p = new ButtonsPage(page, ui); await p.open(); await use(p); },
});

export { expect } from '@playwright/test';

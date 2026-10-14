import { test } from '../fixtures/pageFixtures';
import {
  textBoxData, practiceFormData, checkBoxData, radioData,
  webTableData, alertData, tabData,
} from '../data/testData';

test.describe('DemoQA E2E Flows (POM)', () => {
  test.describe.configure({ timeout: 60000 });

  for (const d of textBoxData) {
    test(`TC01 - Text Box - ${d.title}`, async ({ textBoxPage }) => {
      await textBoxPage.submitForm(d);
      await textBoxPage.verifyOutput(d);
    });
  }

  for (const d of practiceFormData) {
    test(`TC02 - Practice Form - ${d.title}`, async ({ practiceFormPage }) => {
      await practiceFormPage.fillForm(d);
      await practiceFormPage.verifyAndCloseModal(d);
    });
  }

  for (const d of checkBoxData) {
    test(`TC03 - Check Box - ${d.title}`, async ({ checkBoxPage }) => {
      await checkBoxPage.selectNode(d);
      await checkBoxPage.verifyResult(d);
    });
  }

  for (const d of radioData) {
    test(`TC04 - Radio Button - ${d.title}`, async ({ radioButtonPage }) => {
      await radioButtonPage.select(d.option);
      await radioButtonPage.verifyResult(d.option);
    });
  }

  for (const d of webTableData) {
    test(`TC05 - Web Tables - ${d.title}`, async ({ webTablesPage }) => {
      await webTablesPage.addRecord(d);
      await webTablesPage.verifyRecord(d);
    });
  }

  for (const d of alertData) {
    test(`TC06 - Alerts - ${d.title}`, async ({ alertsPage }) => {
      await alertsPage.respondToConfirm(d.accept);
      await alertsPage.verifyConfirmResult(d.expected);
    });
  }

  for (const d of tabData) {
    test(`TC07 - Tabs - ${d.title}`, async ({ tabsPage }) => {
      await tabsPage.openTab(d.tab);
      await tabsPage.verifyContent(d.tab, d.expected);
    });
  }
});

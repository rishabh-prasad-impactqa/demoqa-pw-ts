import { test } from '../fixtures/pageFixtures';
import {
  textBoxData, practiceFormData, checkBoxData, radioData,
  webTableData, alertData, tabData, droppableData, selectMenuData, buttonsData,
} from '../data/testData';

test.describe('DemoQA E2E Flows (POM)', () => {
  test.describe.configure({ timeout: 60000 });

  for (const d of textBoxData) {
    test(`TC01 - Text Box - ${d.title}`, { tag: d.tags }, async ({ textBoxPage }) => {
      await textBoxPage.submitForm(d);
      await textBoxPage.verifyOutput(d);
    });
  }

  for (const d of practiceFormData) {
    test(`TC02 - Practice Form - ${d.title}`, { tag: d.tags }, async ({ practiceFormPage }) => {
      await practiceFormPage.fillForm(d);
      await practiceFormPage.verifyAndCloseModal(d);
    });
  }

  for (const d of checkBoxData) {
    test(`TC03 - Check Box - ${d.title}`, { tag: d.tags }, async ({ checkBoxPage }) => {
      await checkBoxPage.selectNode(d);
      await checkBoxPage.verifyResult(d);
    });
  }

  for (const d of radioData) {
    test(`TC04 - Radio Button - ${d.title}`, { tag: d.tags }, async ({ radioButtonPage }) => {
      await radioButtonPage.select(d.option, d.forceClick);
      await radioButtonPage.verifyResult(d.option);
    });
  }

  for (const d of webTableData) {
    test(`TC05 - Web Tables - ${d.title}`, { tag: d.tags }, async ({ webTablesPage }) => {
      await webTablesPage.addRecord(d);
      await webTablesPage.verifyRecord(d);
    });
  }

  for (const d of alertData) {
    test(`TC06 - Alerts - ${d.title}`, { tag: d.tags }, async ({ alertsPage }) => {
      const message = await alertsPage.respondToConfirm(d.accept);
      alertsPage.verifyAlertMessage(message, d.message);
      await alertsPage.verifyConfirmResult(d.expected);
    });
  }

  for (const d of tabData) {
    test(`TC07 - Tabs - ${d.title}`, { tag: d.tags }, async ({ tabsPage }) => {
      await tabsPage.openTab(d.tab);
      await tabsPage.verifyContent(d.tab, d.expected);
    });
  }

  for (const d of droppableData) {
    test(`TC08 - Droppable (drag and drop) - ${d.title}`, { tag: d.tags }, async ({ droppablePage }) => {
      await droppablePage.dragToDropZone(d);
      await droppablePage.verifyDropped(d);
    });
  }

  for (const d of selectMenuData) {
    test(`TC09 - Select Menu - ${d.title}`, { tag: d.tags }, async ({ selectMenuPage }) => {
      await selectMenuPage.chooseColour(d);
      await selectMenuPage.verifyColour(d);
    });
  }

  for (const d of buttonsData) {
    test(`TC10 - Buttons - ${d.title}`, { tag: d.tags }, async ({ buttonsPage }) => {
      await buttonsPage.performClick(d.action);
      await buttonsPage.verifyMessage(d);
    });
  }
});

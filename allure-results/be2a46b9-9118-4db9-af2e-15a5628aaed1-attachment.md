# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demoqa-pom.spec.ts >> DemoQA E2E Flows (POM) >> TC02 - Practice Form - Female, Haryana Karnal
- Location: tests\demoqa-pom.spec.ts:18:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('#example-modal-sizes-title-lg')
Expected: "Thanks for submitting the form"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" locator('#example-modal-sizes-title-lg') with timeout 5000ms
  - waiting for locator('#example-modal-sizes-title-lg')

```

```yaml
- banner:
  - link:
    - /url: https://demoqa.com
    - img
- img
- text: Elements
- img
- img
- text: Forms
- img
- list:
  - listitem:
    - link "Practice Form":
      - /url: /automation-practice-form
      - img
      - text: Practice Form
- img
- text: Alerts, Frame & Windows
- img
- img
- text: Widgets
- img
- img
- text: Interactions
- img
- img
- text: Book Store Application
- img
- heading "Practice Form" [level=1]
- heading "Student Registration Form" [level=5]
- text: Name
- textbox "First Name": Neha
- textbox "Last Name": Verma
- text: Email
- textbox "name@example.com": neha.verma@example.com
- text: Gender
- radio "Male"
- text: Male
- radio "Female"
- text: Female
- radio "Other"
- text: Other Mobile(10 Digits)
- textbox "Mobile Number": "9123456780"
- text: Date of Birth
- textbox: 21 Oct 2026
- text: Subjects
- log
- text: English
- button "Remove English"
- combobox
- text: Hobbies
- checkbox "Sports"
- text: Sports
- checkbox "Reading" [checked]
- text: Reading
- checkbox "Music"
- text: Music Picture
- button "Choose File"
- text: Current Address
- textbox "Current Address": Karnal, Haryana
- text: State and City
- log
- text: Haryana
- combobox
- log
- text: Karnal
- combobox
- button "Submit"
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | import { PracticeFormData } from '../data/testData';
  4  | 
  5  | export class PracticeFormPage extends BasePage {
  6  |   protected readonly path = '/automation-practice-form';
  7  |   protected readonly title = 'Practice Form';
  8  | 
  9  |   async fillForm(d: PracticeFormData): Promise<void> {
  10 |     await this.fillWithHealing(d.firstName, this.page.locator('#firstName'), this.page.getByRole('textbox', { name: 'First Name' }));
  11 |     await this.fillWithHealing(d.lastName, this.page.locator('#lastName'), this.page.getByRole('textbox', { name: 'Last Name' }));
  12 |     await this.fillWithHealing(d.email, this.page.locator('#userEmail'), this.page.getByRole('textbox', { name: 'name@example.com' }));
  13 |     await this.clickWithHealing(
  14 |       this.page.locator('#genterWrapper').getByText(d.gender, { exact: true }),
  15 |       this.page.getByText(d.gender, { exact: true }),
  16 |     );
  17 |     await this.fillWithHealing(d.mobile, this.page.locator('#userNumber'), this.page.getByRole('textbox', { name: 'Mobile Number' }));
  18 | 
  19 |     await this.fillWithHealing(d.subject, this.page.locator('#subjectsInput'), this.page.getByRole('textbox', { name: 'Subjects' }));
  20 |     await this.clickWithHealing(
  21 |       this.page.locator('.subjects-auto-complete__option', { hasText: d.subject }).first(),
  22 |       this.page.getByText(d.subject, { exact: true }),
  23 |     );
  24 |     await this.clickWithHealing(
  25 |       this.page.locator('#hobbiesWrapper').getByText(d.hobby, { exact: true }),
  26 |       this.page.getByText(d.hobby, { exact: true }),
  27 |     );
  28 | 
  29 |     await this.fillWithHealing(d.address, this.page.locator('#currentAddress'), this.page.getByRole('textbox', { name: 'Current Address' }));
  30 |     await this.clickWithHealing(this.page.locator('#state'), this.page.getByText('Select State', { exact: true }));
  31 |     await this.clickWithHealing(
  32 |       this.page.locator('#stateCity-wrapper').getByText(d.state, { exact: true }),
  33 |       this.page.getByText(d.state, { exact: true }),
  34 |     );
  35 |     await this.clickWithHealing(this.page.locator('#city'), this.page.getByText('Select City', { exact: true }));
  36 |     await this.clickWithHealing(
  37 |       this.page.locator('#stateCity-wrapper').getByText(d.city, { exact: true }),
  38 |       this.page.getByText(d.city, { exact: true }),
  39 |     );
  40 |     await this.clickWithHealing(this.page.locator('#submit'), this.page.getByRole('button', { name: 'Submit', exact: true }));
  41 |   }
  42 | 
  43 |   async verifyAndCloseModal(d: PracticeFormData): Promise<void> {
> 44 |     await expect(this.page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
     |                                                                      ^ Error: expect(locator).toHaveText(expected) failed
  45 |     const values = [`${d.firstName} ${d.lastName}`, d.email, d.gender, d.mobile, d.subject, d.hobby, `${d.state} ${d.city}`];
  46 |     for (const value of values) {
  47 |       await expect(this.page.locator('.modal-body')).toContainText(value);
  48 |     }
  49 |     await this.clickWithHealing(this.page.locator('#closeLargeModal'), this.page.getByRole('button', { name: 'Close', exact: true }));
  50 |   }
  51 | }
  52 | 
```
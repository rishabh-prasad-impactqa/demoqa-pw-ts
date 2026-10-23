# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demoqa-pom.spec.ts >> DemoQA E2E Flows (POM) >> TC03 - Check Box - Desktop
- Location: tests\demoqa-pom.spec.ts:25:9

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('role=treeitem[name="Home"]').locator('.rc-tree-switcher')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - link [ref=e4] [cursor=pointer]:
      - /url: https://demoqa.com
  - generic [ref=e8]:
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e13] [cursor=pointer]: Elements
        - list [ref=e25]:
          - listitem [ref=e26] [cursor=pointer]:
            - link "Text Box" [ref=e27]:
              - /url: /text-box
          - listitem [ref=e30] [cursor=pointer]:
            - link "Check Box" [ref=e31]:
              - /url: /checkbox
          - listitem [ref=e34] [cursor=pointer]:
            - link "Radio Button" [ref=e35]:
              - /url: /radio-button
          - listitem [ref=e38] [cursor=pointer]:
            - link "Web Tables" [ref=e39]:
              - /url: /webtables
          - listitem [ref=e42] [cursor=pointer]:
            - link "Buttons" [ref=e43]:
              - /url: /buttons
          - listitem [ref=e46] [cursor=pointer]:
            - link "Links" [ref=e47]:
              - /url: /links
          - listitem [ref=e50] [cursor=pointer]:
            - link "Broken Links - Images" [ref=e51]:
              - /url: /broken
          - listitem [ref=e54] [cursor=pointer]:
            - link "Upload and Download" [ref=e55]:
              - /url: /upload-download
          - listitem [ref=e58] [cursor=pointer]:
            - link "Dynamic Properties" [ref=e59]:
              - /url: /dynamic-properties
      - generic [ref=e62]: Forms
      - generic [ref=e75]: Alerts, Frame & Windows
      - generic [ref=e87]: Widgets
      - generic [ref=e100]: Interactions
      - generic [ref=e112]: Book Store Application
    - generic [ref=e124]:
      - heading "Check Box" [level=1] [ref=e125]
      - generic [ref=e127]:
        - generic:
          - textbox "for screen reader"
        - tree [ref=e128]:
          - treeitem "Select Home Home" [ref=e132]:
            - generic [ref=e133] [cursor=pointer]
            - checkbox "Select Home" [ref=e134] [cursor=pointer]
            - generic "Home" [ref=e135] [cursor=pointer]
```

# Test source

```ts
  1   | import { Locator, Page } from '@playwright/test';
  2   | import { Target, UIActions } from '../core/UIActions';
  3   | 
  4   | /** Playwright implementation of UIActions. The only file that knows how each action is done in Playwright. */
  5   | export class PlaywrightDriver implements UIActions {
  6   |   constructor(private readonly page: Page) {}
  7   | 
  8   |   async navigate(url: string): Promise<void> {
  9   |     this.log('navigate', url);
  10  |     await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  11  |   }
  12  | 
  13  |   async click(target: Target): Promise<void> {
  14  |     this.log('click', target);
> 15  |     await (await this.find(target)).click();
      |                                     ^ Error: locator.click: Test timeout of 60000ms exceeded.
  16  |   }
  17  | 
  18  |   async forceClick(target: Target): Promise<void> {
  19  |     this.log('forceClick', target);
  20  |     await (await this.find(target, false)).click({ force: true });
  21  |   }
  22  | 
  23  |   async doubleClick(target: Target): Promise<void> {
  24  |     this.log('doubleClick', target);
  25  |     await (await this.find(target)).dblclick();
  26  |   }
  27  | 
  28  |   async rightClick(target: Target): Promise<void> {
  29  |     this.log('rightClick', target);
  30  |     await (await this.find(target)).click({ button: 'right' });
  31  |   }
  32  | 
  33  |   async type(target: Target, text: string): Promise<void> {
  34  |     this.log('type', target, text);
  35  |     await (await this.find(target)).fill(text);
  36  |   }
  37  | 
  38  |   async pressKey(key: string): Promise<void> {
  39  |     this.log('pressKey', key);
  40  |     await this.page.keyboard.press(key);
  41  |   }
  42  | 
  43  |   async select(target: Target, optionText: string): Promise<void> {
  44  |     this.log('select', target, optionText);
  45  |     await (await this.find(target)).selectOption({ label: optionText });
  46  |   }
  47  | 
  48  |   async dragAndDrop(source: Target, destination: Target): Promise<void> {
  49  |     this.log('dragAndDrop', source, `=> ${destination}`);
  50  |     const from = await this.find(source);
  51  |     const to = await this.find(destination);
  52  |     await from.scrollIntoViewIfNeeded();
  53  |     const a = await from.boundingBox();
  54  |     const b = await to.boundingBox();
  55  |     if (!a || !b) throw new Error('dragAndDrop: could not find the source or destination on screen');
  56  | 
  57  |     // Real mouse path in small steps: works for HTML5 drag-and-drop and for libraries like jQuery UI
  58  |     await this.page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
  59  |     await this.page.mouse.down();
  60  |     await this.page.mouse.move(a.x + a.width / 2 + 5, a.y + a.height / 2 + 5);
  61  |     await this.page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 15 });
  62  |     await this.page.mouse.up();
  63  |   }
  64  | 
  65  |   async acceptAlert(trigger: () => Promise<void>): Promise<string> {
  66  |     return this.answerAlert(true, trigger);
  67  |   }
  68  | 
  69  |   async dismissAlert(trigger: () => Promise<void>): Promise<string> {
  70  |     return this.answerAlert(false, trigger);
  71  |   }
  72  | 
  73  |   // Playwright needs the dialog listener BEFORE the click that opens the alert, so we set it up first
  74  |   private async answerAlert(accept: boolean, trigger: () => Promise<void>): Promise<string> {
  75  |     this.log(accept ? 'acceptAlert' : 'dismissAlert');
  76  |     const answered = this.page.waitForEvent('dialog', { timeout: 5000 }).then(async (dialog) => {
  77  |       const message = dialog.message();
  78  |       await (accept ? dialog.accept() : dialog.dismiss());
  79  |       return message;
  80  |     });
  81  |     answered.catch(() => undefined); // no unhandled error if the trigger itself fails first
  82  |     await trigger();
  83  |     return answered;
  84  |   }
  85  | 
  86  |   /**
  87  |    * Turns a Target into a Locator. With [primary, ...fallbacks] it uses the first selector that matches
  88  |    * exactly one visible, usable element (self-healing). `needVisible=false` is for forceClick on hidden inputs.
  89  |    */
  90  |   private async find(target: Target, needVisible = true): Promise<Locator> {
  91  |     const selectors = Array.isArray(target) ? target : [target];
  92  |     if (selectors.length === 1) return this.page.locator(selectors[0]); // no probing, Playwright auto-waits
  93  | 
  94  |     for (let i = 0; i < selectors.length; i += 1) {
  95  |       const candidate = this.page.locator(selectors[i]);
  96  |       if (await candidate.count() !== 1) continue;
  97  |       if (needVisible && !(await candidate.isVisible() && await candidate.isEnabled())) continue;
  98  |       if (i > 0) console.warn(`[self-healing] "${selectors[0]}" failed, used "${selectors[i]}"`);
  99  |       return candidate;
  100 |     }
  101 |     return this.page.locator(selectors[0]); // nothing worked: fail with Playwright's normal error
  102 |   }
  103 | 
  104 |   private log(action: string, target?: Target, extra = ''): void {
  105 |     const where = Array.isArray(target) ? target[0] : target ?? '';
  106 |     console.log(`[ACTION] ${action} ${where} ${extra}`.trim());
  107 |   }
  108 | }
  109 | 
```
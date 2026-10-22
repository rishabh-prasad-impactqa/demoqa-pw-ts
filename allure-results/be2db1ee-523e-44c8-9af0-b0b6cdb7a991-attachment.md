# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demoqa-pom.spec.ts >> DemoQA E2E Flows (POM) >> TC08 - Droppable (drag and drop) - Simple - drag onto drop zone
- Location: tests\demoqa-pom.spec.ts:61:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#simpleDropContainer #droppable')
Expected: "Dropped!"
Received: "Drop Here"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('#simpleDropContainer #droppable') with timeout 5000ms
  - waiting for locator('#simpleDropContainer #droppable')
    13 × locator resolved to <div id="droppable" class="drop-box ui-droppable">…</div>
       - unexpected value "Drop Here"

```

```yaml
- paragraph: Drop Here
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | import { DroppableData } from '../data/testData';
  4  | 
  5  | // Draggable item and drop zone for each tab of the Droppable page
  6  | const ZONES = {
  7  |   simple: { container: '#simpleDropContainer', draggable: '#draggable' },
  8  |   accept: { container: '#acceptDropContainer', draggable: '#acceptable' },
  9  | } as const;
  10 | 
  11 | export class DroppablePage extends BasePage {
  12 |   protected readonly path = '/droppable';
  13 |   protected readonly title = 'Droppable';
  14 | 
  15 |   async dragToDropZone(d: DroppableData): Promise<void> {
  16 |     const zone = ZONES[d.tab];
  17 |     if (d.tab !== 'simple') await this.ui.click(`#droppableExample-tab-${d.tab}`);
  18 |     await this.ui.dragAndDrop(`${zone.container} ${zone.draggable}`, `${zone.container} #droppable`);
  19 |   }
  20 | 
  21 |   async verifyDropped(d: DroppableData): Promise<void> {
> 22 |     await expect(this.page.locator(`${ZONES[d.tab].container} #droppable`)).toHaveText(d.expected);
     |                                                                             ^ Error: expect(locator).toHaveText(expected) failed
  23 |   }
  24 | }
  25 | 
```
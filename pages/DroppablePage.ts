import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { DroppableData } from '../data/testData';

// Draggable item and drop zone for each tab of the Droppable page
const ZONES = {
  simple: { container: '#simpleDropContainer', draggable: '#draggable' },
  accept: { container: '#acceptDropContainer', draggable: '#acceptable' },
} as const;

export class DroppablePage extends BasePage {
  protected readonly path = '/droppable';
  protected readonly title = 'Droppable';

  async dragToDropZone(d: DroppableData): Promise<void> {
    const zone = ZONES[d.tab];
    if (d.tab !== 'simple') await this.ui.click(`#droppableExample-tab-${d.tab}`);
    await this.ui.dragAndDrop(`${zone.container} ${zone.draggable}`, `${zone.container} #droppable`);
  }

  async verifyDropped(d: DroppableData): Promise<void> {
    await expect(this.page.locator(`${ZONES[d.tab].container} #droppable`)).toHaveText(d.expected);
  }
}

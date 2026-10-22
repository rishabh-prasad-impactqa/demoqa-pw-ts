/**
 * Target = which element to act on.
 *  - string    : one selector (CSS, or XPath if it starts with "//")
 *  - string[]  : [primary, ...fallbacks]; the driver uses the first one that works (self-healing)
 */
export type Target = string | string[];

/**
 * UI actions: the things a user can DO on a page, with no tool specifics.
 * Page objects call these and never touch Playwright / Selenium directly.
 * To change the tool, write another class that implements UIActions.
 */
export interface UIActions {
  navigate(url: string): Promise<void>;

  click(target: Target): Promise<void>;
  /** Click even when the element is hidden or covered (skips the "can a user click this" checks). */
  forceClick(target: Target): Promise<void>;
  doubleClick(target: Target): Promise<void>;
  rightClick(target: Target): Promise<void>;

  /** Clears the field, then types the text. */
  type(target: Target, text: string): Promise<void>;
  pressKey(key: string): Promise<void>;
  /** Pick an option of a <select> by its visible text. */
  select(target: Target, optionText: string): Promise<void>;
  dragAndDrop(source: Target, destination: Target): Promise<void>;

  /** `trigger` is the action that opens the alert (usually a click). Returns the alert's message. */
  acceptAlert(trigger: () => Promise<void>): Promise<string>;
  dismissAlert(trigger: () => Promise<void>): Promise<string>;
}

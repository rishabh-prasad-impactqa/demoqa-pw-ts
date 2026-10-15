import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class TestLifecycleReporter implements Reporter {
  onTestBegin(test: TestCase): void {
    console.log(`[TEST START] ${this.testName(test)}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const outcome = result.status === 'skipped'
      ? 'SKIP'
      : result.status === test.expectedStatus
        ? 'PASS'
        : 'FAIL';

    console.log(
      `[TEST ${outcome}] ${this.testName(test)} ` +
      `(status=${result.status}, attempt=${result.retry + 1}, duration=${result.duration}ms)`,
    );
  }

  private testName(test: TestCase): string {
    return test.titlePath().filter(Boolean).join(' > ');
  }
}

export default TestLifecycleReporter;

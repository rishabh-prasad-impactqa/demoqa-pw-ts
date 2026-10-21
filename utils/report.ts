// Report data model for "Rishabh's Report".
// The custom reporter feeds results in with addResult(); the getters below
// are what the HTML report reads from.

export const REPORT_TITLE = "Rishabh's Report";

export type TestStatus = 'passed' | 'failed' | 'skipped';

export interface TestRecord {
  title: string;
  project: string;
  status: TestStatus;
  durationMs: number;
  retries: number;      // how many retries were used (0 = passed first time)
  flaky: boolean;       // failed first, then passed on retry
  tags: string[];
  error?: string;
}

export interface ReportSummary {
  getDate(): string;
  getTime(): string;
  getTotalTests(): number;
  getTotalPass(): number;
  getTotalFail(): number;
  getTotalSkips(): number;
}

export class Report implements ReportSummary {
  private readonly startedAt = new Date();
  private readonly records: TestRecord[] = [];
  private durationMs = 0;

  addResult(record: TestRecord): void {
    this.records.push(record);
  }

  setDuration(ms: number): void {
    this.durationMs = ms;
  }

  getDate(): string {
    return this.startedAt.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }

  getTime(): string {
    return this.startedAt.toLocaleTimeString('en-GB', { hour12: false });
  }

  getTotalTests(): number {
    return this.records.length;
  }

  getTotalPass(): number {
    return this.records.filter(r => r.status === 'passed').length;
  }

  getTotalFail(): number {
    return this.records.filter(r => r.status === 'failed').length;
  }

  getTotalSkips(): number {
    return this.records.filter(r => r.status === 'skipped').length;
  }

  getTotalFlaky(): number {
    return this.records.filter(r => r.flaky).length;
  }

  getPassRate(): string {
    const total = this.getTotalTests();
    return total === 0 ? '0.0' : ((this.getTotalPass() / total) * 100).toFixed(1);
  }

  getDuration(): string {
    return (this.durationMs / 1000).toFixed(1) + ' s';
  }

  getRecords(): TestRecord[] {
    return this.records;
  }
}

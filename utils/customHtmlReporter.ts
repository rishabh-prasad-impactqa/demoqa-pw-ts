import type { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import { REPORT_TITLE, Report, TestRecord } from './report';

const OUTPUT_DIR = 'custom-report';
const OUTPUT_FILE = 'report.html';

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Playwright error messages contain terminal colour codes; strip them for HTML
const stripAnsi = (s: string): string => s.replace(/\u001b\[[0-9;]*m/g, '');

class CustomHtmlReporter implements Reporter {
  private readonly report = new Report();

  printsToStdio(): boolean {
    return false; // let the other reporters keep printing to the terminal
  }

  // Called after every attempt; only the final attempt of a test is recorded,
  // so retries do not inflate the totals.
  onTestEnd(test: TestCase, result: TestResult): void {
    const isFinalAttempt =
      result.status === test.expectedStatus ||
      result.status === 'skipped' ||
      result.retry >= test.retries;
    if (!isFinalAttempt) return;

    const outcome = test.outcome(); // expected | unexpected | flaky | skipped
    const record: TestRecord = {
      title: test.titlePath().filter(Boolean).slice(2).join(' > ') || test.title,
      project: test.parent.project()?.name ?? '',
      status: outcome === 'skipped' ? 'skipped' : outcome === 'unexpected' ? 'failed' : 'passed',
      durationMs: test.results.reduce((sum, r) => sum + r.duration, 0),
      retries: result.retry,
      flaky: outcome === 'flaky',
      tags: test.tags,
      error: outcome === 'unexpected' && result.error?.message
        ? stripAnsi(result.error.message)
        : undefined,
    };
    this.report.addResult(record);
  }

  onEnd(result: FullResult): void {
    this.report.setDuration(result.duration);
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const file = path.join(OUTPUT_DIR, OUTPUT_FILE);
    fs.writeFileSync(file, this.render(), 'utf-8');
    console.log(`[custom-report] ${REPORT_TITLE} written to ${path.resolve(file)}`);
  }

  private render(): string {
    const r = this.report;
    const rows = r.getRecords().map((t, i) => {
      const label = t.status === 'passed' ? (t.flaky ? 'PASSED (flaky)' : 'PASSED')
        : t.status === 'failed' ? 'FAILED' : 'SKIPPED';
      const tags = t.tags.map(x => `<span class="tag">${esc(x)}</span>`).join(' ');
      const err = t.error ? `<pre class="err">${esc(t.error)}</pre>` : '';
      return `<tr class="row ${t.status}" data-status="${t.status}">
        <td>${i + 1}</td>
        <td>${esc(t.title)}${err}</td>
        <td>${esc(t.project)}</td>
        <td>${tags}</td>
        <td>${(t.durationMs / 1000).toFixed(2)} s</td>
        <td>${t.retries}</td>
        <td><span class="badge ${t.status}">${label}</span></td>
      </tr>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(REPORT_TITLE)}</title>
<style>
  :root { --bg:#f4f6fa; --card:#fff; --text:#1d2433; --muted:#6b7385; --line:#e3e7ef;
          --pass:#1f9d55; --fail:#d64545; --skip:#d99a1e; --accent:#3b5bdb; }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#12151c; --card:#1b1f29; --text:#e8ebf2; --muted:#9aa3b5; --line:#2a3040; }
  }
  * { box-sizing: border-box; }
  body { margin:0; font-family:'Segoe UI',system-ui,sans-serif; background:var(--bg); color:var(--text); }
  header { background:var(--accent); color:#fff; padding:28px 40px; }
  header h1 { margin:0 0 6px; font-size:30px; }
  header p { margin:0; opacity:.9; }
  main { max-width:1200px; margin:0 auto; padding:24px 20px 60px; }
  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:14px; margin-bottom:24px; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:16px; border-top:4px solid var(--accent); }
  .card.pass { border-top-color:var(--pass); } .card.fail { border-top-color:var(--fail); } .card.skip { border-top-color:var(--skip); }
  .card .n { font-size:32px; font-weight:700; } .card .l { color:var(--muted); font-size:13px; }
  .bar { display:flex; height:12px; border-radius:6px; overflow:hidden; background:var(--line); margin-bottom:24px; }
  .bar i { display:block; } .bar .p { background:var(--pass); } .bar .f { background:var(--fail); } .bar .s { background:var(--skip); }
  .filters { margin-bottom:12px; display:flex; gap:8px; flex-wrap:wrap; }
  .filters button { border:1px solid var(--line); background:var(--card); color:var(--text); padding:6px 14px; border-radius:20px; cursor:pointer; }
  .filters button.active { background:var(--accent); color:#fff; border-color:var(--accent); }
  .wrap { overflow-x:auto; background:var(--card); border:1px solid var(--line); border-radius:10px; }
  table { width:100%; border-collapse:collapse; font-size:14px; }
  th, td { text-align:left; padding:10px 14px; border-bottom:1px solid var(--line); vertical-align:top; }
  th { color:var(--muted); font-weight:600; font-size:12px; text-transform:uppercase; }
  .badge { padding:3px 10px; border-radius:12px; font-size:12px; font-weight:600; color:#fff; white-space:nowrap; }
  .badge.passed { background:var(--pass); } .badge.failed { background:var(--fail); } .badge.skipped { background:var(--skip); }
  .tag { background:var(--line); border-radius:4px; padding:2px 6px; font-size:12px; }
  .err { background:rgba(214,69,69,.1); color:var(--fail); padding:8px; border-radius:6px; white-space:pre-wrap; font-size:12px; max-height:160px; overflow:auto; }
  footer { text-align:center; color:var(--muted); font-size:12px; margin-top:24px; }
</style>
</head>
<body>
<header>
  <h1>${esc(REPORT_TITLE)}</h1>
  <p>Run on ${esc(r.getDate())} at ${esc(r.getTime())} &nbsp;|&nbsp; Duration ${esc(r.getDuration())}</p>
</header>
<main>
  <section class="cards">
    <div class="card"><div class="n">${r.getTotalTests()}</div><div class="l">Total tests</div></div>
    <div class="card pass"><div class="n">${r.getTotalPass()}</div><div class="l">Passed</div></div>
    <div class="card fail"><div class="n">${r.getTotalFail()}</div><div class="l">Failed</div></div>
    <div class="card skip"><div class="n">${r.getTotalSkips()}</div><div class="l">Skipped</div></div>
    <div class="card"><div class="n">${r.getPassRate()}%</div><div class="l">Pass rate${r.getTotalFlaky() ? ` (${r.getTotalFlaky()} flaky)` : ''}</div></div>
  </section>
  <div class="bar" title="pass / fail / skip">
    <i class="p" style="width:${pct(r.getTotalPass(), r.getTotalTests())}%"></i>
    <i class="f" style="width:${pct(r.getTotalFail(), r.getTotalTests())}%"></i>
    <i class="s" style="width:${pct(r.getTotalSkips(), r.getTotalTests())}%"></i>
  </div>
  <div class="filters">
    <button class="active" data-f="all">All</button>
    <button data-f="passed">Passed</button>
    <button data-f="failed">Failed</button>
    <button data-f="skipped">Skipped</button>
  </div>
  <div class="wrap">
    <table>
      <thead><tr><th>#</th><th>Test</th><th>Browser</th><th>Tags</th><th>Duration</th><th>Retries</th><th>Status</th></tr></thead>
      <tbody>
${rows}
      </tbody>
    </table>
  </div>
  <footer>${esc(REPORT_TITLE)} &middot; generated by customHtmlReporter</footer>
</main>
<script>
  document.querySelectorAll('.filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.filters button').forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      var f = b.getAttribute('data-f');
      document.querySelectorAll('tr.row').forEach(function (tr) {
        tr.style.display = (f === 'all' || tr.getAttribute('data-status') === f) ? '' : 'none';
      });
    });
  });
</script>
</body>
</html>`;
  }
}

function pct(n: number, total: number): string {
  return total === 0 ? '0' : ((n / total) * 100).toFixed(2);
}

export default CustomHtmlReporter;

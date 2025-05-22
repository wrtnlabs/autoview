
import Component from "../components/674";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"ref":"refs/pull/123/merge","analysis_key":"codeql-analysis:main","environment":"go-1.17","category":"security","state":"open","commit_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","message":{"text":"Potential SQL injection vulnerability detected (Sample). Use parameterized queries."},"location":{"path":"app/database/queries.py","start_line":120,"end_line":120,"start_column":15,"end_column":45},"html_url":"https://github.com/example-org/sample-repo/security/code-scanning/alert/AZ1234F5/sample","classifications":["source"]},{"ref":"main-test","state":"fixed","commit_sha":"123456abcdef123456abcdef123456abcdef1234","location":{"path":"src/components/Button.jsx","start_line":10,"end_line":12,"start_column":5,"end_column":15},"classifications":["test",null]}];
}

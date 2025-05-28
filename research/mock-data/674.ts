
import Component from "../components/674";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"ref":"refs/heads/sample-branch","analysis_key":"codeql-analysis-sample","environment":"CI Test Environment","category":"java-analysis-test","state":"open","commit_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","message":{"text":"This is a sample alert message for UI testing. Ensure description wraps correctly."},"location":{"path":"src/components/SampleComponent.js","start_line":120,"end_line":120,"start_column":10,"end_column":20},"html_url":"https://github.com/example-org/sample-repo/security/code-scanning/alert/12345","classifications":["source","test"]},{"ref":"refs/pull/42/merge","state":null,"commit_sha":"123456abcdef7890abcdef123456abcdef7890ab","html_url":"https://api.example.com/v1/test-items/sample-456","classifications":[]}];
}

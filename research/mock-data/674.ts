
import Component from "../components/674";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"ref":"refs/pull/101/head","analysis_key":"ci-scan-analysis-v1","environment":"TypeScript","category":"static-analysis","state":"open","commit_sha":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","message":{"text":"High severity vulnerability detected in parseInput function."},"location":{"path":"lib/utils/parser.ts","start_line":210,"end_line":215,"start_column":5,"end_column":30},"html_url":"https://api.example.com/repos/example-org/sample-repo/code-scanning/alerts/101","classifications":["source","test"]},{"ref":"refs/heads/main","state":"dismissed","commit_sha":"0f1e2d3c4b5a6978879695a4b3c2d1e0f9876543"}];
}

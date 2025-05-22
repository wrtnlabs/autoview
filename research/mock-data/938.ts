
import Component from "../components/938";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"state":"completed","completed_at":"2025-05-19T11:23:45Z","branch":"feature/sample-export","sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","id":"export-789-sample","export_url":"https://api.example.com/codespaces/sample-codespace/exports/export-789-sample","html_url":"https://www.example.com/codespaces/sample-codespace/exports/export-789-sample/html"};
}

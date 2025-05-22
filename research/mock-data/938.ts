
import Component from "../components/938";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"state":"completed","completed_at":"2025-05-19T10:05:30Z","branch":"feature/sample-export","sha":"a3f1d2c3b4a5968778695a4b3c2d1e0f98765432","id":"export-00123","export_url":"https://api.example.com/v1/codespace-exports/export-00123","html_url":"https://www.example.com/branches/feature/sample-export"};
}

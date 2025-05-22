
import Component from "../components/99";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_12345_test","created_at":"2025-05-19T14:30:00Z","format":"md","body":"# Sample Comment Title (Test)\n\nThis is a sample comment body in **Markdown** format. It includes multiple lines, some lists, and test placeholders.\n\n- Item 1\n- Item 2\n\nAll content is fictional and for UI testing purposes.","files":[{"name":"design_doc","extension":"pdf","url":"https://www.example.com/files/sample-design_doc.pdf"},{"name":"README","extension":null,"url":"https://www.example.com/files/README"}]};
}

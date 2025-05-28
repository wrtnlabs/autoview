
import Component from "../components/95";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_20250519_001","created_at":"2025-05-19T14:30:00Z","format":"md","title":"Sample BBS Article Snapshot (Test)","body":"## Sample Article (Test)\n\nThis is a sample BBS article snapshot used for UI component testing. All content is fictional and for demonstration purposes only. Please do not consider this as actual production data.\n\n### Features\n- Lorem ipsum dolor sit amet (Test).\n- Consectetur adipiscing elit.\n- Curabitur vel sem at tortor consequat tincidunt.\n\n![Sample Diagram](https://www.example.com/files/diagram-flow-sample.png)\n","files":[{"name":"project-plan","extension":"pdf","url":"https://www.example.com/files/project-plan-sample.pdf"},{"name":"diagram-flow","extension":"png","url":"https://www.example.com/files/diagram-flow-sample.png"},{"name":"README","extension":null,"url":"https://www.example.com/files/README"}]};
}


import Component from "../components/95";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_001_test","created_at":"2025-05-19T14:30:00Z","format":"md","title":"Test BBS Article Snapshot (Sample)","body":"# Sample Article Snapshot\n\nThis is a **sample** snapshot of a BBS article used for UI testing purposes.\n\n## Introduction\n\n- Point one about test data.\n- Point two ensures lists render correctly.\n\n## Content\n\nHere is a paragraph with some _italic_ and **bold** text. This helps check text styling.\n\n> This is a blockquote example in a sample article.\n\n![Sample Image](https://www.example.com/images/sample-image.png \"Sample Image (Test)\")\n\nEnd of sample data.","files":[{"name":"diagram","extension":"png","url":"https://www.example.com/files/diagram-sample.png"},{"name":"summary","extension":"pdf","url":"https://www.example.com/files/summary-sample.pdf"},{"name":"","extension":null,"url":"https://www.example.com/files/.gitignore"}]};
}

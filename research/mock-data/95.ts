
import Component from "../components/95";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snap_20250519_001","created_at":"2025-05-19T12:00:00Z","format":"md","title":"Sample BBS Article Snapshot (Test)","body":"# Sample Article\n\nThis is a **markdown** snapshot of a bulletin board article used for UI testing purposes.\n\n- Point one\n- Point two\n\n> This is a sample blockquote.\n\nFor more info, visit [Example](https://www.example.com).","files":[{"name":"diagram","extension":"png","url":"https://www.example.com/files/diagram_sample.png"},{"name":"README","extension":null,"url":"https://www.example.com/files/README_sample"}]};
}


import Component from "../components/103";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"score":4.7,"id":"snapshot_001_test","created_at":"2025-05-19T14:30:00Z","format":"md","title":"Test Product Review Snapshot (Sample)","body":"## Overview\nThis is a sample review body for UI testing purposes. It includes multiple lines to verify text wrapping and markdown rendering. All content is fictional and used for demonstration only.","files":[{"name":"review-image","extension":"png","url":"https://www.example.com/assets/sample-review-image.png"},{"name":"README","extension":null,"url":"https://www.example.com/assets/README"}]};
}

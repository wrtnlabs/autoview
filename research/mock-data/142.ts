
import Component from "../components/142";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_001_test","created_at":"2025-05-19T14:30:00Z","format":"md","body":"This is a sample snapshot comment for UI testing purposes. It demonstrates **markdown** formatting and includes multiple lines.\n\n- Bullet item one\n- Bullet item two\n\n_All content is fictional and for demonstration only._","files":[{"name":"screenshot_1","extension":"png","url":"https://www.example.com/files/snapshot_screenshot1.png"},{"name":"log","extension":"txt","url":"https://api.example.com/v1/test-files/sample-log.txt"},{"name":"","extension":null,"url":"https://www.example.org/files/README"}]};
}

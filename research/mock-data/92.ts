
import Component from "../components/92";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_20250519_001","created_at":"2025-05-19T14:30:00Z","format":"md","body":"This is a sample comment body for testing. It includes **markdown** formatting and represents a snapshot of user feedback. All content is fictional and for demonstration purposes only.","files":[{"name":"screenshot_test","extension":"png","url":"https://www.example.com/files/screenshot_test.png"},{"name":"project-plan","extension":"md","url":"https://www.example.com/files/project-plan.md"}]};
}

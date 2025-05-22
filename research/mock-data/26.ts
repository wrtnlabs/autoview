
import Component from "../components/26";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_00123_test","created_at":"2025-05-19T14:30:00Z","format":"md","body":"## Sample Inquiry Comment (Test)\n\nThis is a mock comment body for UI testing purposes. It includes *markdown* formatting to simulate real user input. \"All data is fictional and for demonstration only.\"","files":[{"name":"screenshot_01","extension":"png","url":"https://www.example.com/assets/screenshot_01_sample.png"},{"name":"specification","extension":"pdf","url":"https://www.example.com/assets/specification_sample.pdf"}]};
}

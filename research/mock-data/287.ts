
import Component from "../components/287";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"external_id":null,"uid":20250519,"name":"Sample Item (Test UI)","description":"This is a sample description for UI testing purposes. All content herein is fictional and for demonstration only.","url":"https://api.example.com/v1/test-items/sample-123","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:00:00Z","tags":["ui-test","sample-data","fictitious"],"metadata":{"version":"v1.0.0-test","notes":"Nested metadata for UI component testing (Dummy Data)."},"owner":{"login":"test-owner-sample-org","type":"Organization","id":99001},"items":[{"key":"value1_sample"},{"key":"value2_sample"}]};
}

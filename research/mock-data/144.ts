
import Component from "../components/144";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"seller":{"id":"seller_001","created_at":"2025-05-19T09:15:00Z"},"id":"answer_001","snapshots":[{"id":"snapshot_001","created_at":"2025-05-19T09:16:00Z","format":"md","title":"Initial Inquiry Answer (Test)","body":"## Initial Answer Body\nThis is a sample answer body for testing purposes. All content is fictional and used for UI mock data only.","files":[{"name":"response_details","extension":"txt","url":"https://www.example.com/files/response_details_test.txt"}]},{"id":"snapshot_002","created_at":"2025-05-19T10:00:00Z","format":"html","title":"Updated Inquiry Answer (Test)","body":"<p>This is an updated sample answer with <strong>HTML</strong> content. It includes additional clarification for UI testing.</p>","files":[{"name":"","extension":null,"url":"https://www.example.com/files/.gitignore"},{"name":"diagram","extension":"svg","url":"https://www.example.com/files/diagram_test.svg"}]}],"created_at":"2025-05-19T09:16:00Z"};
}

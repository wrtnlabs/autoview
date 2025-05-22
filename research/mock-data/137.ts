
import Component from "../components/137";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"seller":{"id":"seller_12345_test","created_at":"2025-05-10T09:15:00Z"},"id":"answer_67890_test","snapshots":[{"id":"snapshot_001_test","created_at":"2025-05-10T09:15:00Z","format":"md","title":"Sample Inquiry Answer Title (Test Snapshot)","body":"This is a sample answer body in markdown format. It addresses customer inquiry regarding order #12345. All content is fictional.","files":[{"name":"order_details","extension":"pdf","url":"https://www.example.com/files/sample-order-details.pdf"}]},{"id":"snapshot_002_test","created_at":"2025-05-10T09:45:00Z","format":"html","title":"Updated Answer Title (Test Snapshot)","body":"<p>This is an updated <strong>answer</strong> body in HTML format. It now includes additional details and clarifications. All content is for UI testing purposes only.</p>","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/files/mock-screenshot.png"},{"name":"","extension":null,"url":"https://www.example.com/files/.gitignore"}]}],"created_at":"2025-05-10T10:00:00Z"};
}


import Component from "../components/23";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"seller-123-sample","name":"Sample Seller (Test)","account_type":"seller"},"id":"cmt-789-sample","parent_id":"550e8400-e29b-41d4-a716-446655440000","snapshots":[{"id":"snap-001-sample","created_at":"2025-05-19T14:00:00Z","format":"md","body":"# Initial Comment Sample\nThis is a **Markdown** snapshot of the comment body. All text is fictional and for UI testing.","files":[]},{"id":"snap-002-sample","created_at":"2025-05-19T14:45:00Z","format":"html","body":"<p>Updated <em>HTML</em> snapshot of the comment. Sample update for UI rendering test.</p>","files":[{"name":"attachment","extension":"pdf","url":"https://www.example.com/files/sample-attachment.pdf"}]}],"created_at":"2025-05-19T15:00:00Z"};
}

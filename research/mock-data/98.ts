
import Component from "../components/98";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","id":"cust_sample_001","displayName":"Sample Customer (Test)"},"id":"comment_7890","parent_id":"123e4567-e89b-12d3-a456-426614174000","snapshots":[{"id":"snapshot_001","created_at":"2025-05-19T12:00:00Z","format":"md","body":"This is a sample inquiry comment. Initial comment body for testing UI display. All content is fictional and for demonstration purposes only.","files":[{"name":"design_doc","extension":"pdf","url":"https://www.example.com/files/design_doc.pdf"}]},{"id":"snapshot_002","created_at":"2025-05-20T08:30:00Z","format":"html","body":"<p>This is an updated comment body. Minor edits were made for clarity. Sample test update.</p>","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/files/screenshot.png"},{"name":"","extension":"txt","url":"https://www.example.com/files/README.txt"}]}],"created_at":"2025-05-19T12:00:00Z"};
}

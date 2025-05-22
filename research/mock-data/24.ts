
import Component from "../components/24";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"writer":{"id":"cust_001","role":"customer","name":"Alice Doe (Test Customer)"},"id":"comment_001","parent_id":null,"snapshots":[{"id":"snap_001","created_at":"2025-05-19T10:00:00Z","format":"md","body":"This is a sample comment for testing purposes. All text is fictional.","files":[]},{"id":"snap_002","created_at":"2025-05-19T12:00:00Z","format":"html","body":"<p>This is an edited version of the comment. Still sample.</p>","files":[{"name":"screenshot_01","extension":"png","url":"https://www.example.com/files/screenshot_01.png"}]}],"created_at":"2025-05-19T12:00:00Z"},{"writer":{"id":"seller_001","role":"seller","name":"Sample Seller (Test Seller)"},"id":"comment_002","parent_id":"550e8400-e29b-41d4-a716-446655440000","snapshots":[{"id":"snap_003","created_at":"2025-05-19T13:15:00Z","format":"txt","body":"Replying to the first comment. Sample reply content.","files":[{"name":"attachment_reply","extension":"pdf","url":"https://www.example.com/files/attachment_reply.pdf"}]}],"created_at":"2025-05-19T13:15:00Z"}]};
}

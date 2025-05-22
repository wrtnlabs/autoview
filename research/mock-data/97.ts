
import Component from "../components/97";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"writer":{"id":"cust_001_test","type":"IShoppingCustomer","name":"Test Customer (Sample)"},"id":"comment_001_test","parent_id":null,"snapshots":[{"id":"snap-001a-test","created_at":"2025-05-19T09:15:00Z","format":"md","body":"Initial inquiry comment body for testing purposes. All content fictional.","files":[]},{"id":"snap-001b-test","created_at":"2025-05-19T10:00:00Z","format":"md","body":"Edited comment content: added more details for UI rendering test.","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/files/screenshot_test.png"}]}],"created_at":"2025-05-19T09:15:00Z"},{"writer":{"id":"seller_123_test","type":"IShoppingSeller","name":"Sample Seller (Test)"},"id":"comment_002_test","parent_id":"11111111-1111-1111-1111-111111111111","snapshots":[{"id":"snap-002a-test","created_at":"2025-05-19T11:30:00Z","format":"html","body":"<p>Seller response to inquiry comment. This is a test reply.</p>","files":[{"name":"manual","extension":"pdf","url":"https://www.example.com/files/manual_test.pdf"}]}],"created_at":"2025-05-19T11:30:00Z"}]};
}

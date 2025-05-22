
import Component from "../components/98";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":null,"citizen":null,"id":"cust-001-test","channel":{"id":"chan-001-test","created_at":"2025-05-19T12:00:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop/test-page","referrer":"https://referrer.example.org/test","ip":"192.0.2.1","created_at":"2025-05-19T12:34:56Z"},"id":"comment-1001-test","parent_id":"11111111-2222-3333-4444-555555555555","snapshots":[{"id":"snap-uuid-001","created_at":"2025-05-19T12:35:00Z","format":"md","body":"Initial inquiry comment. This is a sample comment for UI testing purposes.","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/files/test-screenshot.png"}]},{"id":"snap-uuid-002","created_at":"2025-05-19T12:40:00Z","format":"html","body":"<p>Updated comment with additional details for testing UI rendering.</p>","files":[]}],"created_at":"2025-05-19T12:45:00Z"};
}


import Component from "../components/97";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"writer":{"type":"customer","member":{"citizen":null,"seller":null,"administrator":null,"id":"member-1001","nickname":"sample_user_001","emails":[{"id":"email-1001","value":"test.user@example.com","created_at":"2025-05-19T14:00:00Z"}],"created_at":"2025-05-19T14:00:00Z"},"citizen":null,"id":"customer-1001","channel":{"id":"channel-01","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop/item/123?test=true","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-19T14:30:00Z"},"id":"comment-001","parent_id":null,"snapshots":[{"id":"snapshot-001","created_at":"2025-05-19T14:45:00Z","format":"md","body":"Initial comment body for UI testing purposes. All content is fictional.","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/assets/screenshot.png"}]},{"id":"snapshot-002","created_at":"2025-05-19T15:00:00Z","format":"md","body":"Edited comment body (Test). Updated to reflect additional details.","files":[]}],"created_at":"2025-05-19T15:00:00Z"}]};
}

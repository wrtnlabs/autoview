
import Component from "../components/23";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"seller","member":{"id":"member-abc-123","nickname":"seller_user_test","emails":[{"id":"email-001","value":"seller.test@example.com","created_at":"2025-05-10T09:15:00Z"}],"created_at":"2025-05-10T09:00:00Z"},"customer":{"id":"customer-789","channel":{"id":"channel-001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Website Test Channel"},"external_user":null,"href":"https://www.example.com/test-path","referrer":null,"ip":"203.0.113.5","created_at":"2025-05-15T14:20:00Z"},"citizen":{"id":"citizen-001","created_at":"2025-02-20T08:30:00Z","mobile":"+1-555-000-1234","name":"John Doe (Test)"},"id":"seller-xyz-789","created_at":"2025-05-01T11:45:00Z"},"id":"comment-001","parent_id":null,"snapshots":[{"id":"snapshot-001","created_at":"2025-05-19T10:00:00Z","format":"md","body":"Initial comment body in markdown. This is for testing.","files":[{"name":"test_image","extension":"png","url":"https://www.example.com/files/test_image.png"}]},{"id":"snapshot-002","created_at":"2025-05-19T11:30:00Z","format":"html","body":"<p>Edited comment body with <strong>HTML</strong> content for UI test.</p>","files":[]}],"created_at":"2025-05-19T11:30:00Z"};
}

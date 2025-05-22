
import Component from "../components/96";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":{"citizen":{"id":"citizen_321","created_at":"2025-01-10T09:00:00Z","mobile":"+1-202-555-0143","name":"John Doe (Test)"},"seller":null,"administrator":null,"id":"member_456","nickname":"jdoe_test","emails":[{"id":"email_001","value":"test.user@example.com","created_at":"2025-01-15T10:20:00Z"},{"id":"email_002","value":"jdoe.alt@example.org","created_at":"2025-02-20T08:15:00Z"}],"created_at":"2025-01-15T10:20:00Z"},"citizen":null,"id":"customer_789","channel":{"id":"channel_web_01","created_at":"2024-01-10T09:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop/sample-page","referrer":"https://referrer.example.com/path","ip":"203.0.113.42","created_at":"2025-05-18T16:45:00Z"},"id":"comment_abc123","parent_id":null,"snapshots":[{"id":"snapshot_001","created_at":"2025-05-19T12:00:00Z","format":"md","body":"Initial comment body sample content for UI testing. Dummy comment.","files":[]},{"id":"snapshot_002","created_at":"2025-05-20T08:30:00Z","format":"html","body":"<p>Edited comment content (<strong>Test update</strong>).</p>","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/test-files/sample-screenshot.png"}]}],"created_at":"2025-05-19T12:00:00Z"};
}

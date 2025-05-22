
import Component from "../components/25";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":{"citizen":{"id":"citizen-001","created_at":"2025-05-18T08:55:00Z","mobile":"010-1234-5678","name":"Test User (Sample)"},"seller":null,"administrator":null,"id":"member-123","nickname":"sample_member_01","emails":[{"id":"email-001","value":"test.user@example.com","created_at":"2025-05-18T09:00:00Z"}],"created_at":"2025-05-18T09:00:00Z"},"citizen":{"id":"citizen-002","created_at":"2025-05-18T10:00:00Z","mobile":"010-8765-4321","name":"Sample Tester (Dummy)"},"id":"customer-789","channel":{"id":"channel-001","created_at":"2025-01-01T00:00:00Z","code":"WEB_MALL","name":"Web Shopping Mall (Test)"},"external_user":null,"href":"https://www.example.com/products/sample-123?test=true","referrer":"https://www.example.com/home","ip":"203.0.113.5","created_at":"2025-05-19T14:22:00Z"},"id":"comment-456","parent_id":"123e4567-e89b-12d3-a456-426614174000","snapshots":[{"id":"snapshot-001","created_at":"2025-05-19T14:22:00Z","format":"html","body":"<p>This is a <strong>sample comment</strong> for UI testing purposes.</p>","files":[{"name":"diagram","extension":"png","url":"https://www.example.com/files/diagram.png"}]},{"id":"snapshot-002","created_at":"2025-05-19T15:00:00Z","format":"md","body":"This is an edited sample comment.\n\n- Bullet one\n- Bullet two","files":[]}],"created_at":"2025-05-19T14:22:00Z"};
}

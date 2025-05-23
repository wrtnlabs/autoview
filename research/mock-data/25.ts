
import Component from "../components/25";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"administrator","member":{"id":"member_invert_001","nickname":"adminUserSample","emails":[{"id":"email_001","value":"admin.user@example.com","created_at":"2025-05-18T08:00:00Z"}],"created_at":"2025-05-18T08:00:00Z"},"customer":{"id":"customer_invert_001","channel":{"id":"channel_001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Website Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop/page?test=1","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-19T14:45:00Z"},"citizen":{"id":"citizen_001","created_at":"2025-05-18T08:30:00Z","mobile":"010-0000-0000 (Test)","name":"Sample Admin (Test)"},"id":"admin_invert_001","created_at":"2025-05-18T08:00:00Z"},"id":"comment_001_sample","parent_id":"111e4567-e89b-12d3-a456-426614174999","snapshots":[{"id":"snapshot_001","created_at":"2025-05-19T14:00:00Z","format":"md","body":"Initial comment content (Test).","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/files/test-screenshot.png"}]},{"id":"snapshot_002","created_at":"2025-05-19T14:30:00Z","format":"md","body":"Updated comment content (Test).","files":[{"name":"","extension":null,"url":"https://www.example.com/files/edit-log.txt"}]}],"created_at":"2025-05-19T15:00:00Z"};
}

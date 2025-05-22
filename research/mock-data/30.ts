
import Component from "../components/30";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"administrator","member":{"id":"member-1001","nickname":"AdminMember (Test)","emails":[{"id":"email-2002","value":"admin.user@example.com","created_at":"2025-01-10T09:15:00Z"}],"created_at":"2025-01-10T09:15:00Z"},"customer":{"id":"customer-3003","channel":{"id":"channel-001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop/inquiry/1234","referrer":"https://www.example.com/home","ip":"203.0.113.45","created_at":"2025-05-19T14:00:00Z"},"citizen":{"id":"citizen-7890","created_at":"2025-02-20T07:30:00Z","mobile":"+1-555-123-4567","name":"Admin User (Sample)"},"id":"admin-1234","created_at":"2025-01-10T09:15:00Z"},"id":"comment-1234","parent_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","snapshots":[{"id":"snapshot-1","created_at":"2025-05-19T14:01:00Z","format":"html","body":"<p>This is a test comment (Sample).</p>","files":[{"name":"attachment-test","extension":"txt","url":"https://www.example.com/files/attachment-test.txt"}]},{"id":"snapshot-2","created_at":"2025-05-19T14:05:00Z","format":"md","body":"**Updated** comment content (Sample)","files":[{"name":"image-sample","extension":"png","url":"https://www.example.com/files/image-sample.png"}]}],"created_at":"2025-05-19T14:01:00Z"};
}

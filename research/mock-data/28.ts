
import Component from "../components/28";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":{"citizen":{"id":"citizen-001","created_at":"2025-01-10T07:45:00Z","mobile":"+1-202-555-0156","name":"John Doe (Test)"},"seller":null,"administrator":null,"id":"member-001","nickname":"test_user_sample","emails":[{"id":"email-001","value":"test.user@example.com","created_at":"2025-01-10T08:00:00Z"}],"created_at":"2025-01-10T08:00:00Z"},"citizen":{"id":"citizen-002","created_at":"2025-01-10T07:50:00Z","mobile":"+1-303-555-0198","name":"Jane Smith (Sample)"},"id":"customer-555","channel":{"id":"channel-001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop/inquiry/test","referrer":null,"ip":"198.51.100.23","created_at":"2025-01-14T12:00:00Z"},"id":"inq-comment-001","parent_id":null,"snapshots":[{"id":"snapshot-001","created_at":"2025-01-15T09:32:00Z","format":"md","body":"This is a **test** comment snapshot. All content is fictional and for demonstration purposes only.","files":[{"name":"image1","extension":"png","url":"https://www.example.com/files/image1.png"},{"name":"document","extension":"pdf","url":"https://www.example.com/files/document.pdf"}]},{"id":"snapshot-002","created_at":"2025-01-16T10:00:00Z","format":"html","body":"Updated comment content in HTML format <em>sample update</em>. This is purely for UI testing.","files":[]}],"created_at":"2025-01-15T10:00:00Z"};
}


import Component from "../components/139";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":{"citizen":{"id":"ctz-98765","created_at":"2025-05-18T09:30:00Z","mobile":"+1-555-012-3456","name":"Test User (Citizen)"},"seller":null,"administrator":null,"id":"mmb-12345","nickname":"test.user.sample","emails":[{"id":"eml-1","value":"test.user@example.com","created_at":"2025-05-19T13:45:00Z"},{"id":"eml-2","value":"test.secondary@example.org","created_at":"2025-05-19T14:00:00Z"}],"created_at":"2025-05-19T13:44:00Z"},"citizen":{"id":"ctz-98765","created_at":"2025-05-18T09:30:00Z","mobile":"+1-555-012-3456","name":"Test User (Citizen)"},"id":"cust-54321","channel":{"id":"chn-001","created_at":"2025-01-01T00:00:00Z","code":"WEB_TEST","name":"Web Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop/test?session=abc123","referrer":"https://referrer.example.org/path/sample","ip":"198.51.100.45","created_at":"2025-05-19T14:20:00Z"},"id":"cmt-7890","parent_id":null,"snapshots":[{"id":"snap-001","created_at":"2025-05-19T14:21:00Z","format":"txt","body":"Initial comment body for testing UI layout.","files":[]},{"id":"snap-002","created_at":"2025-05-19T14:30:00Z","format":"html","body":"<p>Edited comment body with <strong>HTML</strong> formatting. All content is fictional for UI test.</p>","files":[{"name":"attachment_test","extension":"png","url":"https://cdn.example.com/uploads/attachment_test.png"}]}],"created_at":"2025-05-19T14:30:00Z"};
}

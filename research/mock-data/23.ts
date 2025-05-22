
import Component from "../components/23";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":{"citizen":{"id":"citizen-789","created_at":"2025-05-10T08:30:00Z","mobile":"202-555-0143","name":"John Doe (Test)"},"seller":null,"administrator":null,"id":"member-456","nickname":"sample_user_test","emails":[{"id":"email-1","value":"sample.user@example.com","created_at":"2025-05-10T08:35:00Z"}],"created_at":"2025-05-10T08:30:00Z"},"citizen":null,"id":"customer-789","channel":{"id":"channel-web-001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Website (Sample)"},"external_user":null,"href":"https://www.example.com/products/sample-product","referrer":"https://referrer.example.net/landing","ip":"198.51.100.23","created_at":"2025-05-19T14:45:00Z"},"id":"comment-123","parent_id":"123e4567-e89b-12d3-a456-426614174000","snapshots":[{"id":"snapshot-001","created_at":"2025-05-19T15:00:00Z","format":"md","body":"This is a sample comment body (Test).","files":[{"name":"attachment_sample","extension":"jpg","url":"https://www.example.com/files/sample.jpg"}]},{"id":"snapshot-002","created_at":"2025-05-20T09:15:00Z","format":"html","body":"Edited comment body with <strong>rich</strong> formatting (Test).","files":[{"name":"upload","extension":"pdf","url":"https://docs.example.org/sample.pdf"},{"name":"report","extension":null,"url":"https://files.example.net/reports/report"}]}],"created_at":"2025-05-19T15:00:00Z"};
}

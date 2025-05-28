
import Component from "../components/89";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"seller","member":{"id":"mem-001","nickname":"test_seller_member","emails":[{"id":"email-001","value":"seller_test@example.com","created_at":"2025-05-01T08:30:00Z"}],"created_at":"2025-05-01T08:30:00Z"},"customer":{"id":"cust-inv-001","channel":{"id":"chan-001","created_at":"2025-04-01T09:00:00Z","code":"WEB","name":"Web (Test)"},"external_user":null,"href":"https://www.example.com/store?session=sample","referrer":"https://referrer.example.org/page","ip":"192.168.1.100","created_at":"2025-05-19T13:50:00Z"},"citizen":{"id":"cit-001","created_at":"2025-04-20T10:15:00Z","mobile":"+1-555-0100","name":"Test Seller Citizen"},"id":"seller-001","created_at":"2025-05-01T08:30:00Z"},"id":"comment-001","parent_id":"123e4567-e89b-12d3-a456-426614174000","snapshots":[{"id":"snap-001","created_at":"2025-05-19T14:00:00Z","format":"md","body":"Initial comment body in **Markdown** format. This is a sample comment for UI testing purposes.","files":[{"name":"diagram","extension":"png","url":"https://cdn.example.com/files/diagram.png"}]},{"id":"snap-002","created_at":"2025-05-19T15:30:00Z","format":"html","body":"<p>Updated comment in <em>HTML</em> format. Second revision.</p>","files":[]}],"created_at":"2025-05-19T16:00:00Z"};
}

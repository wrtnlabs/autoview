
import Component from "../components/141";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"seller","member":{"id":"member-001-sample","nickname":"SellerMember (Sample)","emails":[{"id":"email-001","value":"seller01@example.com","created_at":"2025-01-10T08:30:00Z"}],"created_at":"2025-01-10T08:30:00Z"},"customer":{"id":"customer-5678-sample","channel":{"id":"channel-001","created_at":"2024-12-01T00:00:00Z","code":"WEB","name":"Web Store (Sample)"},"external_user":null,"href":"https://www.example.com/shop/product/12345","referrer":"https://referrer.example.com/home","ip":"192.0.2.123","created_at":"2025-05-19T15:00:00Z"},"citizen":{"id":"citizen-9012-sample","created_at":"2024-11-20T09:15:00Z","mobile":"+1-555-000-1234","name":"Sample Seller (Test)"},"id":"seller-invert-1111","created_at":"2024-11-20T09:15:00Z"},"id":"comment-3456-sample","parent_id":"123e4567-e89b-12d3-a456-426614174000","snapshots":[{"id":"snapshot-0001","created_at":"2025-05-19T15:45:00Z","format":"md","body":"Initial comment on the sale inquiry. This is a *markdown* formatted sample. (Sample Data)","files":[{"name":"spec-sheet","extension":"pdf","url":"https://www.example.com/files/spec-sheet.pdf"}]},{"id":"snapshot-0002","created_at":"2025-05-19T16:00:00Z","format":"html","body":"<p>Updated comment after review. <strong>Test update</strong> for UI testing.</p>","files":[]}],"created_at":"2025-05-19T15:45:00Z"};
}

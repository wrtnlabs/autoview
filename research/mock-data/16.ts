
import Component from "../components/16";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"550e8400-e29b-41d4-a716-446655440000","administrator":{"type":"administrator","member":{"id":"member_001","nickname":"alice_admin","emails":[{"id":"email_001","value":"alice.admin@example.com","created_at":"2025-05-18T09:15:00Z"},{"id":"email_002","value":"admin.backup@example.org","created_at":"2025-05-19T10:00:00Z"}],"created_at":"2025-05-18T09:00:00Z"},"customer":{"id":"customer_001","channel":{"id":"channel_001","created_at":"2025-01-01T00:00:00Z","code":"WEB_TEST","name":"Web Store (Test Channel)"},"external_user":null,"href":"https://www.example.com/shop?session=abc123","referrer":"https://referrer.example.org/page","ip":"192.0.2.123","created_at":"2025-05-19T08:45:00Z"},"citizen":{"id":"citizen_admin_456","created_at":"2025-05-17T12:00:00Z","mobile":"+1-555-987-6543","name":"Alice Admin (Test)"},"id":"administrator_001","created_at":"2025-05-17T12:05:00Z"},"citizen":{"id":"citizen_don_123","created_at":"2025-05-19T14:00:00Z","mobile":"+1-555-234-5678","name":"John Smith (Test)"},"value":150,"reason":"Donation for community support (Test)","created_at":"2025-05-19T14:30:00Z"};
}


import Component from "../components/18";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"550e8400-e29b-41d4-a716-446655440000","administrator":{"type":"administrator","member":{"id":"member-001","nickname":"SampleMember (Test)","emails":[{"id":"email-001","value":"sample.member@example.org","created_at":"2023-11-05T08:16:00Z"},{"id":"email-002","value":"alternate.member@example.com","created_at":"2024-03-10T10:00:00Z"}],"created_at":"2023-11-05T08:15:45Z"},"customer":{"id":"customer-001","channel":{"id":"channel-01","created_at":"2022-06-01T12:00:00Z","code":"ONLINE_STORE","name":"Online Store (Test)"},"external_user":null,"href":"https://www.example.com/shop/test-session","referrer":"https://referrer.example.net/landing","ip":"203.0.113.5","created_at":"2025-05-19T14:29:50Z"},"citizen":{"id":"citizen-999","created_at":"2024-02-20T12:00:00Z","mobile":"+1-555-010-1000","name":"Test User (Citizen)"},"id":"admin-001","created_at":"2024-01-15T09:20:30Z"},"citizen":{"id":"citizen-1000","created_at":"2025-05-19T14:30:00Z","mobile":"+1-555-020-2000","name":"Sample Recipient (Test)"},"value":1500,"reason":"Donation for community development (Test)","created_at":"2025-05-19T14:30:00Z"};
}


import Component from "../components/52";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"citizen":{"id":"citizen-456","created_at":"2025-05-19T14:00:00Z","mobile":"+1-555-0123","name":"Test User (Citizen)"},"seller":null,"administrator":null,"id":"member-789","nickname":"testuser123","emails":[{"id":"email-001","value":"test.user@example.com","created_at":"2025-05-19T14:05:00Z"}],"created_at":"2025-05-19T14:05:00Z"},"citizen":{"id":"citizen-123","created_at":"2025-05-19T13:55:00Z","mobile":"+1-555-0001","name":"John Doe (Test)"},"id":"cust-001","channel":{"id":"channel-001","created_at":"2025-01-01T00:00:00Z","code":"web","name":"Web Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop?session=abc123","referrer":"https://www.example.com/landing","ip":"192.0.2.1","created_at":"2025-05-19T15:00:00Z"};
}

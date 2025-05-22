
import Component from "../components/64";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"123e4567-e89b-12d3-a456-426614174000","customer":{"type":"customer","member":{"citizen":{"id":"citizen-001","created_at":"2025-05-01T09:00:00Z","mobile":"+1-555-000-1234","name":"Test User (Sample)"},"seller":{"id":"seller-001","created_at":"2025-05-02T10:00:00Z"},"administrator":null,"id":"member-001","nickname":"testuser_sample","emails":[{"id":"email-001","value":"test.user@example.com","created_at":"2025-05-01T09:05:00Z"},{"id":"email-002","value":"user.alt@example.org","created_at":"2025-05-01T09:10:00Z"}],"created_at":"2025-05-01T09:00:00Z"},"citizen":null,"id":"cust-001","channel":{"id":"channel-001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Store (Sample)"},"external_user":null,"href":"https://www.example.com/shop","referrer":"https://referrer.example.com/sample-path","ip":"192.0.2.1","created_at":"2025-05-19T14:50:00Z"},"publish":{"id":"123e4567-e89b-12d3-a456-426614174999","created_at":"2025-05-19T15:00:00Z","paid_at":"2025-05-19T15:05:00Z","cancelled_at":null},"created_at":"2025-05-19T14:55:00Z","value":250.75};
}

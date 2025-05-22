
import Component from "../components/62";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"550e8400-e29b-41d4-a716-446655440000","customer":{"type":"customer","member":{"citizen":{"id":"citizen_001","created_at":"2025-01-15T08:40:00Z","mobile":"010-5555-0000","name":"Sample User (Test)"},"seller":{"id":"seller_789","created_at":"2025-02-20T12:00:00Z"},"administrator":null,"id":"member_abc_123","nickname":"test_member_001","emails":[{"id":"email_001","value":"test.user@example.com","created_at":"2025-01-15T08:45:00Z"},{"id":"email_002","value":"sample.member@example.org","created_at":"2025-01-16T09:00:00Z"}],"created_at":"2025-01-15T08:45:00Z"},"citizen":{"id":"citizen_002","created_at":"2025-01-15T08:40:00Z","mobile":"010-5555-0000","name":"Sample User (Test)"},"id":"customer_123","channel":{"id":"channel_web","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop/test?session=abc123","referrer":"https://www.example.org/landing/test","ip":"203.0.113.5","created_at":"2025-05-19T10:19:00Z"},"publish":{"id":"123e4567-e89b-12d3-a456-426614174001","created_at":"2025-05-19T10:20:00Z","paid_at":"2025-05-19T10:21:00Z","cancelled_at":null},"created_at":"2025-05-19T10:18:00Z","value":150.75};
}

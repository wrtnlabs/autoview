
import Component from "../components/62";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"123e4567-e89b-12d3-a456-426614174000","customer":{"type":"customer","member":{"id":"member_abc123","nickname":"sample_user_member","emails":[{"id":"email_001","value":"test.user@example.com","created_at":"2024-12-10T09:00:00Z"}],"created_at":"2024-12-10T09:00:00Z","citizen":null,"seller":null,"administrator":null},"citizen":null,"id":"customer_001","channel":{"id":"channel_001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Website (Test Channel)"},"external_user":null,"href":"https://www.example.com/shop","referrer":"https://referrer.example.com/homepage","ip":"203.0.113.5","created_at":"2025-05-19T11:55:00Z"},"publish":{"id":"223e4567-e89b-12d3-a456-426614174001","created_at":"2025-05-19T12:00:10Z","paid_at":"2025-05-19T12:05:00Z","cancelled_at":null},"created_at":"2025-05-19T12:00:00Z","value":150.5};
}

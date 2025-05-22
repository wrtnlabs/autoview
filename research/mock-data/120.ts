
import Component from "../components/120";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"seller","id":"seller_12345","created_at":"2025-05-19T14:30:00Z","member":{"id":"member_67890","nickname":"test_user_dev","emails":[{"id":"email_1001","value":"test.user1@example.com","created_at":"2025-01-10T08:30:00Z"},{"id":"email_1002","value":"dev.user2@example.org","created_at":"2025-02-15T12:00:00Z"}],"created_at":"2025-01-10T08:30:00Z"},"customer":{"id":"customer_54321","channel":{"id":"channel_abc123","created_at":"2025-03-01T09:15:00Z","code":"WEB_STORE","name":"Web Store Test Channel"},"external_user":null,"href":"https://www.example.com/test-session","referrer":"https://referrer.example.org/landing","ip":"192.0.2.123","created_at":"2025-05-19T14:00:00Z"},"citizen":{"id":"citizen_22222","created_at":"2025-01-05T11:45:00Z","mobile":"+1-555-0100","name":"John Doe (Test)"}};
}

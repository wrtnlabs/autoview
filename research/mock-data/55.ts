
import Component from "../components/55";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"citizen":{"id":"citizen-001","created_at":"2025-05-18T09:15:00Z","mobile":"+1-555-0100","name":"Test User (Member)"},"seller":{"id":"seller-001","created_at":"2025-05-18T10:00:00Z"},"administrator":null,"id":"member-001","nickname":"SampleMember (Test)","emails":[{"id":"email-001","value":"member.test@example.com","created_at":"2025-05-18T09:20:00Z"},{"id":"email-002","value":"member.backup@example.org","created_at":"2025-05-18T09:25:00Z"}],"created_at":"2025-05-18T09:00:00Z"},"citizen":{"id":"citizen-001","created_at":"2025-05-18T09:15:00Z","mobile":"+1-555-0100","name":"Test User (Member)"},"id":"customer-001","channel":{"id":"channel-web-001","created_at":"2025-05-01T08:00:00Z","code":"web","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop?session=test123","referrer":"https://referrer.example.org/home","ip":"203.0.113.42","created_at":"2025-05-19T14:30:00Z"};
}

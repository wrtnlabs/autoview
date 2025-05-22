
import Component from "../components/54";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"id":"member_001_sample","nickname":"tester_user_sample","emails":[{"id":"email_001","value":"test.user@example.com","created_at":"2025-01-10T12:00:00Z"},{"id":"email_002","value":"alt.user@example.org","created_at":"2025-02-15T09:45:00Z"}],"citizen":{"id":"citizen_20250519_01","created_at":"2025-05-19T08:15:00Z","mobile":"+15555550123","name":"Test User (Sample)"},"seller":{"id":"seller_001_sample","created_at":"2025-03-05T14:20:00Z"},"administrator":null,"created_at":"2025-01-10T12:00:00Z"},"citizen":{"id":"citizen_20250519_01","created_at":"2025-05-19T08:15:00Z","mobile":"+15555550123","name":"Test User (Sample)"},"id":"cust_001_sample","channel":{"id":"channel_web_01","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Store (Sample)"},"external_user":null,"href":"https://www.example.com/shop/test-session","referrer":"https://www.example.com/home","ip":"203.0.113.5","created_at":"2025-05-19T09:30:00Z"};
}

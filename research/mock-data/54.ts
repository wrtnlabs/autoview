
import Component from "../components/54";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"id":"member_001_test","nickname":"sample_member_01","emails":[{"id":"member_email_001_test","value":"test.user@example.com","created_at":"2025-05-18T09:15:00Z"},{"id":"member_email_002_test","value":"sample.account@example.org","created_at":"2025-05-18T09:20:00Z"}],"created_at":"2025-05-18T09:00:00Z","citizen":{"id":"citizen_001_test","created_at":"2025-05-18T08:50:00Z","mobile":"010-0000-0000","name":"Test User (Sample)"},"seller":null,"administrator":null},"citizen":{"id":"citizen_root_001_test","created_at":"2025-05-18T10:00:00Z","mobile":"010-1111-2222","name":"Test Shopper (Demo)"},"id":"customer_123_test","channel":{"id":"channel_web_01_test","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web (Test Channel)"},"external_user":null,"href":"https://www.example.com/testing-page?sessionId=abc123_test","referrer":"https://referrer.example.org/path/to/page","ip":"203.0.113.5","created_at":"2025-05-19T14:30:00Z"};
}

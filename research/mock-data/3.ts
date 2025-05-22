
import Component from "../components/3";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"administrator","member":{"id":"member_invert_001","nickname":"test_member_01","emails":[{"id":"email_001","value":"test.user@example.com","created_at":"2025-05-01T09:16:00Z"},{"id":"email_002","value":"alt.user@example.org","created_at":"2025-05-01T09:17:00Z"}],"created_at":"2025-05-01T09:15:30Z"},"customer":{"id":"customer_invert_001","channel":{"id":"channel_001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Example Channel (Test)"},"external_user":{"provider":"sampleProvider","id":"ext_12345"},"href":"https://www.example.com/shop?session=abc123","referrer":"https://www.example.com/home","ip":"192.0.2.1","created_at":"2025-05-19T08:05:00Z"},"citizen":{"id":"citizen_001","created_at":"2025-05-18T14:30:00Z","mobile":"+15551234567","name":"John Doe (Test)"},"id":"admin_invert_001","created_at":"2025-05-20T10:00:00Z"};
}

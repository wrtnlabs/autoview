
import Component from "../components/120";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"seller","member":{"id":"member_invert_1001","nickname":"test_member_1001","emails":[{"id":"email_5001","value":"test.user@example.com","created_at":"2025-05-18T09:16:00Z"},{"id":"email_5002","value":"alternate.user@example.org","created_at":"2025-05-18T09:17:00Z"}],"created_at":"2025-05-18T09:15:00Z"},"customer":{"id":"customer_invert_2001","channel":{"id":"channel_1001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Sales Channel (Test)"},"external_user":{"id":"extuser_3001","citizen":{"id":"citizen_ext_3001","created_at":"2025-03-10T11:00:00Z","mobile":"+15551234567","name":"Sample External User (Test)"},"created_at":"2025-03-10T11:00:00Z","uid":"extuid_abc123","application":"WEB","nickname":"ext_user_123","data":{"source":"ExternalService","preferences":{"newsletter":false}}},"href":"https://www.example.com/shop/test-session","referrer":"https://referrer.example.org/entry","ip":"198.51.100.23","created_at":"2025-05-19T14:25:00Z"},"citizen":{"id":"citizen_4001","created_at":"2025-05-19T14:00:00Z","mobile":"+15557654321","name":"John Doe (Test)"},"id":"seller_invert_5001","created_at":"2025-05-19T14:30:00Z"};
}


import Component from "../components/53";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"id":"member_5678-test","nickname":"sample_user_123","created_at":"2024-11-01T09:15:00Z","citizen":{"id":"citizen_0001-test","created_at":"2025-05-19T14:00:00Z","mobile":"010-1234-5678 (Sample)","name":"Jane Doe (Test)"},"seller":{"id":"seller_9999-test","created_at":"2024-12-01T10:00:00Z"},"administrator":null,"emails":[{"id":"email_1111-test","value":"test.user@example.com","created_at":"2024-11-01T09:20:00Z"},{"id":"email_2222-test","value":"secondary.email@example.org","created_at":"2025-01-15T12:45:00Z"}]},"citizen":{"id":"citizen_0001-test","created_at":"2025-05-19T14:00:00Z","mobile":"010-1234-5678 (Sample)","name":"Jane Doe (Test)"},"id":"cust_1234-test","channel":{"id":"channel_01-test","created_at":"2020-01-01T00:00:00Z","code":"WEB","name":"Web Store (Sample)"},"external_user":{"id":"external_3333-test","citizen":null,"created_at":"2023-08-10T08:30:00Z","uid":"ext_user_abc123","application":"GOOGLE","nickname":"google_user_sample","data":{"profile_picture":"https://example.com/images/profile_dummy.png","locale":"en-US"}},"href":"https://www.example.com/shop?session=test123","referrer":"https://referrer.example.org/test-page","ip":"203.0.113.45","created_at":"2025-05-19T14:35:00Z"};
}

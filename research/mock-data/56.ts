
import Component from "../components/56";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"citizen":{"id":"cit_2002_test","created_at":"2024-12-01T08:45:00Z","mobile":"+1-555-000-1111","name":"John Doe (Test Member)"},"seller":{"id":"sell_4004_test","created_at":"2025-01-02T16:20:00Z"},"administrator":null,"id":"mem_5005_test","nickname":"johndoe_member","emails":[{"id":"email_6006_test","value":"johndoe.member@example.com","created_at":"2024-12-02T09:00:00Z"}],"created_at":"2024-12-01T08:45:00Z"},"citizen":{"id":"cit_2002_test","created_at":"2024-12-01T08:45:00Z","mobile":"+1-555-000-1111","name":"John Doe (Test Member)"},"id":"cust_0002_test","channel":{"id":"chan_02_test","created_at":"2024-11-15T09:30:00Z","code":"MOBILE_APP_TEST","name":"Mobile App Test Channel"},"external_user":{"id":"ext_3003_test","citizen":null,"created_at":"2024-12-05T14:10:00Z","uid":"external_123test","application":"SERVICE_TEST_APP","nickname":"external_user_test","data":{"profile_url":"https://external.example.org/user/profile/testuser","metadata":{"role":"tester"}}},"href":"https://app.example.com/shop?session=abc123test","referrer":null,"ip":"2001:db8::1","created_at":"2025-05-19T10:15:00Z"};
}

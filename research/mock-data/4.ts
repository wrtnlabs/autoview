
import Component from "../components/4";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"administrator","member":{"id":"member_67890","nickname":"sample_member_01","emails":[{"id":"email_1","value":"test.user@example.com","created_at":"2025-01-10T08:30:00Z"},{"id":"email_2","value":"sample.account@example.org","created_at":"2025-02-15T11:45:00Z"}],"created_at":"2025-01-10T08:30:00Z"},"customer":{"id":"customer_abc123","channel":{"id":"channel_01","created_at":"2024-12-01T09:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":{"id":"external_555","citizen":{"id":"citizen_ext_001","created_at":"2024-12-05T07:00:00Z","mobile":"+1-555-000-1234","name":"External User (Dummy)"},"created_at":"2024-12-05T07:00:00Z","uid":"ext_user_1001","application":"WEB","nickname":"ext_nick_01","data":{"referralCode":"SAMPLE123","preferences":{"newsletter":false}}},"href":"https://www.example.com/shop/test-session","referrer":"https://www.example.com/home","ip":"203.0.113.42","created_at":"2025-05-18T15:20:00Z"},"citizen":{"id":"citizen_999","created_at":"2025-05-17T14:00:00Z","mobile":"+1-555-987-6543","name":"John Doe (Test)"},"id":"administrator_abc001","created_at":"2025-05-19T09:15:00Z"};
}


import Component from "../components/4";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"administrator","member":{"id":"member_67890","nickname":"test_member_sample","emails":[{"id":"email_001","value":"test.user@example.com","created_at":"2025-05-10T09:15:00Z"},{"id":"email_002","value":"sample.member@example.org","created_at":"2025-05-11T11:20:00Z"}],"created_at":"2025-05-10T09:15:00Z"},"customer":{"id":"customer_12345","channel":{"id":"channel_001","created_at":"2025-01-15T08:00:00Z","code":"WEB_STORE","name":"Web Store (Test)"},"external_user":{"id":"external_user_abc123","citizen":{"id":"citizen_ext_001","created_at":"2025-02-01T12:00:00Z","mobile":"+1-555-111-2222","name":"External User (Test)"},"created_at":"2025-02-01T12:00:00Z","uid":"extUID_001","application":"EXTERNAL_APP_TEST","nickname":"ext_user_sample","data":{"additional_info":"Sample data for UI testing","preferences":{"newsletter":false,"notifications":"sms_test"}}},"href":"https://www.example.com/test-shop","referrer":"https://referrer.example.com/page","ip":"203.0.113.45","created_at":"2025-05-19T14:00:00Z"},"citizen":{"id":"citizen_98765","created_at":"2025-05-19T14:25:00Z","mobile":"+1-555-000-1234","name":"Sample User (Test)"},"id":"admin_12345","created_at":"2025-05-19T14:30:00Z"};
}

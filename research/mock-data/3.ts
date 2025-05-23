
import Component from "../components/3";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"administrator","member":{"id":"member-001-test","nickname":"SampleMember (Test)","emails":[{"id":"member-email-001","value":"sample.member@example.com","created_at":"2024-11-10T09:15:00Z"},{"id":"member-email-002","value":"sample.member.alt@example.org","created_at":"2024-11-11T10:20:00Z"}],"created_at":"2024-11-10T09:15:00Z"},"customer":{"id":"cust-1234-test","channel":{"id":"chan-web-001","created_at":"2023-01-01T00:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":{"id":"extuser-5678-test","citizen":null,"created_at":"2024-12-05T12:00:00Z","uid":"external_abc123","application":"oauth_example","nickname":"SampleExtUser (Test)","data":{"additional_info":"Sample external user data (Test)","legacy_id":987}},"href":"https://www.example.com/shop?session=abc123","referrer":"https://referrer.example.net/sample-path","ip":"203.0.113.42","created_at":"2025-05-19T14:00:00Z"},"citizen":{"id":"citizen-9999-test","created_at":"2024-12-01T08:45:00Z","mobile":"555-012-3456","name":"John Doe (Test)"},"id":"admin-001-test","created_at":"2025-05-19T14:30:00Z"};
}

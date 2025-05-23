
import Component from "../components/2";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"administrator","member":{"id":"member-1234","nickname":"sampleMember01","emails":[{"id":"email-001","value":"test.user@example.com","created_at":"2025-04-01T09:16:00Z"},{"id":"email-002","value":"sample.member@example.org","created_at":"2025-04-02T10:20:00Z"}],"created_at":"2025-04-01T09:15:00Z"},"customer":{"id":"customer-5678","channel":{"id":"channel-01","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web (Test Channel)"},"external_user":{"id":"extuser-0001","citizen":{"id":"citizen-234","created_at":"2025-03-10T11:00:00Z","mobile":"+1-555-0100","name":"External User (Test)"},"created_at":"2025-03-10T11:00:00Z","uid":"ext_uid_789","application":"MOBILE_APP","nickname":"mobileTestUser","data":{"profile":"Sample external profile data","preferences":{"newsletter":false}}},"href":"https://www.example.com/shop?session=test_session_id","referrer":"https://referrer.example.org/path","ip":"192.0.2.123","created_at":"2025-05-19T11:59:00Z"},"citizen":{"id":"citizen-001","created_at":"2025-02-15T08:30:00Z","mobile":"+1-555-0001","name":"Admin User (Test)"},"id":"admin-0001","created_at":"2025-05-19T12:00:00Z"};
}

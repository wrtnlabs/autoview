
import Component from "../components/51";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"setHeaders":{"Authorization":"Bearer dummy-token-sample-123456"},"token":{"access":"access_token_sample_abc123","refresh":"refresh_token_sample_def456","expired_at":"2025-06-19T12:00:00Z","refreshable_until":"2025-07-01T12:00:00Z"},"type":"customer","member":{"id":"member-id-001","nickname":"sample_member_001","emails":[{"id":"member-email-id-001","value":"test.user@example.com","created_at":"2025-05-19T09:05:00Z"},{"id":"member-email-id-002","value":"user.sample@example.org","created_at":"2025-05-19T09:10:00Z"}],"created_at":"2025-05-19T09:00:00Z","citizen":{"id":"member-citizen-id-001","created_at":"2025-05-19T09:02:00Z","mobile":"+82-10-1234-5678","name":"Jane Doe (Sample)"},"seller":null,"administrator":null},"citizen":{"id":"citizen-id-001","created_at":"2025-05-18T08:30:00Z","mobile":"+82-10-9999-0000","name":"John Doe (Test)"},"id":"customer-id-001","channel":{"id":"channel-id-001","created_at":"2025-01-01T00:00:00Z","code":"WEB_STORE_TEST","name":"Web Store (Test Channel)"},"external_user":{"id":"external-user-id-001","citizen":null,"created_at":"2025-04-01T12:00:00Z","uid":"external-uid-12345","application":"EXT_APP_TEST","nickname":"ext_user_sample","data":{"profile":"sample","role":"tester"}},"href":"https://www.example.com/dashboard/sample","referrer":"https://referrer.example.org/page-test","ip":"203.0.113.45","created_at":"2025-05-19T10:15:30Z"};
}


import Component from "../components/51";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"setHeaders":{"Authorization":"Bearer test-token-abc123"},"token":{"access":"access-token-sample-xyz","refresh":"refresh-token-sample-abc","expired_at":"2025-05-25T12:00:00Z","refreshable_until":"2025-06-01T12:00:00Z"},"type":"customer","member":{"citizen":{"id":"citizen_member_001","created_at":"2025-01-15T08:30:00Z","mobile":"+1-555-000-0001","name":"Test Member Citizen"},"seller":null,"administrator":null,"id":"member_001","nickname":"test_member_001","emails":[{"id":"member_email_001","value":"member.one@example.com","created_at":"2025-01-15T08:31:00Z"}],"created_at":"2025-01-15T08:30:00Z"},"citizen":{"id":"citizen_root_001","created_at":"2024-12-01T12:00:00Z","mobile":"+1-555-010-0200","name":"Root Test Citizen"},"id":"customer_12345","channel":{"id":"channel_web_001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":{"id":"external_user_001","citizen":{"id":"citizen_external_001","created_at":"2025-03-20T10:00:00Z","mobile":"+1-555-000-0002","name":"External User Citizen"},"created_at":"2025-03-20T09:45:00Z","uid":"ext-uid-12345","application":"GITHUB","nickname":"external_user_test","data":{"profile_url":"https://api.example.com/external_user/profile/12345","roles":["tester","guest"]}},"href":"https://www.example.com/shop/home?session=test","referrer":"https://www.example.org/referrer-test","ip":"192.0.2.123","created_at":"2025-05-19T14:30:00Z"};
}

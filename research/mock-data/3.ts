
import Component from "../components/3";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"administrator","member":{"id":"member_001","nickname":"shopUserTest","emails":[{"id":"email_001","value":"test.user@example.com","created_at":"2025-05-01T10:00:00Z"},{"id":"email_002","value":"secondary.user@example.org","created_at":"2025-05-02T11:15:00Z"}],"created_at":"2025-05-01T09:30:00Z"},"customer":{"id":"customer_123","channel":{"id":"channel_01","created_at":"2024-12-31T23:59:59Z","code":"ONLINE_STORE","name":"Online Store (Test)"},"external_user":{"id":"external_user_001","citizen":{"id":"citizen_ext_001","created_at":"2025-04-20T08:00:00Z","mobile":"010-0000-0000","name":"External User (Test)"},"created_at":"2025-04-20T08:05:00Z","uid":"extuid_abcdef123","application":"SOCIAL_APP_TEST","nickname":"socialUserTest","data":{"profileUrl":"https://www.example.com/user/socialUserTest","preferences":{"newsletter":false}}},"href":"https://www.example.com/shop/test-page","referrer":"https://referrer.example.org/test-ref","ip":"203.0.113.45","created_at":"2025-05-19T13:44:55Z"},"citizen":{"id":"citizen_001","created_at":"2025-05-01T12:00:00Z","mobile":"010-1111-2222","name":"John Doe (Test)"},"id":"admin_inv_001","created_at":"2025-05-19T13:45:00Z"};
}

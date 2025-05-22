
import Component from "../components/56";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"citizen":{"id":"citizen_002","created_at":"2025-05-19T14:00:00Z","mobile":"010-2222-3333","name":"Member Tester (Sample)"},"seller":{"id":"seller_001","created_at":"2025-05-19T14:05:00Z"},"administrator":null,"id":"member_001","nickname":"test_member_001","emails":[{"id":"email_001","value":"test.member1@example.com","created_at":"2025-05-19T14:10:00Z"}],"created_at":"2025-05-19T14:05:00Z"},"citizen":{"id":"citizen_001","created_at":"2025-05-19T13:45:00Z","mobile":"010-0000-1111","name":"Sample User (Test)"},"id":"cust_001_test","channel":{"id":"channel_001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Platform (Test)"},"external_user":{"id":"external_001","citizen":null,"created_at":"2025-05-19T13:50:00Z","uid":"ext_uid_12345","application":"social_test_app","nickname":"ext_user_test","data":{"profile_picture":"https://www.example.com/images/avatar_test.png","locale":"en-US"}},"href":"https://www.example.com/shop/test-session-001","referrer":"https://referrer.example.org/path","ip":"192.0.2.123","created_at":"2025-05-19T14:30:00Z"};
}

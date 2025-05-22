
import Component from "../components/120";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"seller","member":{"id":"member_2001_test","nickname":"test_member_01","emails":[{"id":"email_3001","value":"test.user@example.com","created_at":"2023-01-15T08:30:00Z"},{"id":"email_3002","value":"sample.member@example.org","created_at":"2024-02-20T16:45:00Z"}],"created_at":"2022-11-01T09:15:00Z"},"customer":{"id":"customer_4001_test","channel":{"id":"channel_5001","created_at":"2021-06-10T14:20:00Z","code":"ONLINE_STORE","name":"Online Store Test Channel"},"external_user":{"id":"external_user_6001","citizen":{"id":"citizen_7002","created_at":"2024-12-01T10:00:00Z","mobile":"+1-555-123-4567","name":"Sample User (Test)"},"created_at":"2023-07-22T11:00:00Z","uid":"ext_8001","application":"SOCIAL_APP_TEST","nickname":"social_user_test","data":{"profileUrl":"https://social.example.com/user/test","attributes":{"lang":"en","timezone":"UTC"}}},"href":"https://www.example.com/sample-path","referrer":"https://referrer.example.com/home","ip":"203.0.113.45","created_at":"2025-05-19T11:55:00Z"},"citizen":{"id":"citizen_9001","created_at":"2025-05-19T11:59:00Z","mobile":"+1-555-000-1234","name":"Sample Seller (Test)"},"id":"seller_1001_test","created_at":"2025-05-19T12:00:00Z"};
}

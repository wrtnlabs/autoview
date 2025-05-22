
import Component from "../components/16";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","administrator":{"type":"administrator","member":{"id":"member_001","nickname":"admin_user_test","emails":[{"id":"email_001","value":"admin.user@example.org","created_at":"2024-03-10T11:20:30Z"}],"created_at":"2024-03-10T11:20:30Z"},"customer":{"id":"cust_001","channel":{"id":"channel_001","created_at":"2023-07-01T08:00:00Z","code":"WEB_TEST","name":"Web Shop (Test Channel)"},"external_user":{"id":"extu_001","citizen":null,"created_at":"2024-05-15T09:30:00Z","uid":"ext_uid_12345","application":"APP_TEST","nickname":"external_user_test","data":{"sampleKey":"sampleValue"}},"href":"https://www.example.com/shop?session=abc123","referrer":"https://referrer.example.org/landing-page","ip":"192.0.2.1","created_at":"2024-05-15T09:30:00Z"},"citizen":{"id":"citizen_admin_001","created_at":"2022-12-20T14:45:00Z","mobile":"+821012345678","name":"Admin Name (Test)"},"id":"admin_001","created_at":"2024-03-11T12:00:00Z"},"citizen":{"id":"citizen_002","created_at":"2025-01-05T10:15:00Z","mobile":"+821098765432","name":"Test User (Sample)"},"value":500,"reason":"Donation for community aid (Test)","created_at":"2025-05-19T14:21:05Z"};
}

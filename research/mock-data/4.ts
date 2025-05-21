
import Component from "../components/4";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"administrator","member":{"id":"member_001_test","nickname":"TestMember_Nick (Sample)","emails":[{"id":"email_001_test","value":"primary_test.user@example.com","created_at":"2025-05-01T12:01:00Z"},{"id":"email_002_test","value":"secondary_test.user@example.org","created_at":"2025-05-01T12:02:00Z"}],"created_at":"2025-05-01T12:00:00Z"},"customer":{"id":"customer_001_test","channel":{"id":"channel_001_test","created_at":"2025-04-01T10:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":{"id":"ext_user_123_test","provider":"TestProvider"},"href":"https://www.example.com/shop?session=abc123test","referrer":"https://www.example.com/home","ip":"192.0.2.123","created_at":"2025-05-19T09:15:00Z"},"citizen":{"id":"citizen_001_test","created_at":"2025-05-19T08:00:00Z","mobile":"010-1234-5678","name":"Jane Doe (Test)"},"id":"admin_001_test","created_at":"2025-05-19T09:00:00Z"};
}

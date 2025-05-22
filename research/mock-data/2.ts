
import Component from "../components/2";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"administrator","member":{"id":"member-1234-test","nickname":"sampleUser (Test)","emails":[{"id":"member-email-1-test","value":"sample.user@example.com","created_at":"2025-05-18T10:00:00Z"},{"id":"member-email-2-test","value":"backup.user@example.org","created_at":"2025-05-18T11:15:00Z"}],"created_at":"2025-05-18T09:45:00Z"},"customer":{"id":"customer-7890-test","channel":{"id":"channel-01-test","created_at":"2025-05-17T08:00:00Z","code":"WEBSTORE_TEST","name":"Web Store (Test)"},"external_user":{"provider":"TestProvider","external_id":"ext-456-test"},"href":"https://www.example.com/shop/test-session","referrer":"https://referrer.example.org/view","ip":"192.168.0.100","created_at":"2025-05-19T13:59:30Z"},"citizen":{"id":"citizen-3210-test","created_at":"2025-05-15T12:00:00Z","mobile":"+12345678901","name":"Jane Doe (Test)"},"id":"admin-001-test","created_at":"2025-05-19T14:30:00Z"};
}

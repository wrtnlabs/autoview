
import Component from "../components/119";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"seller","member":{"id":"member-001-test","nickname":"TesterUser_Sample","emails":[{"id":"memberEmail-001","value":"test.user@example.com","created_at":"2025-05-18T08:00:00Z"},{"id":"memberEmail-002","value":"user.test+sample@example.org","created_at":"2025-05-18T09:15:00Z"}],"created_at":"2025-05-18T07:30:00Z"},"customer":{"id":"customer-001-test","channel":{"id":"channel-001-test","created_at":"2025-01-01T00:00:00Z","code":"WEB_TEST","name":"Web Store (Sample)"},"external_user":{"external_id":"ext-user-123-sample","service":"ThirdPartyService (Test)"},"href":"https://shop.example.com/products/test-item-123","referrer":"https://www.example.com/home-test-page","ip":"203.0.113.5","created_at":"2025-05-19T14:00:00Z"},"citizen":{"id":"citizen-001-test","created_at":"2025-04-01T12:00:00Z","mobile":"+15550100000","name":"Sample User (Test)"},"id":"seller-001-test","created_at":"2025-05-19T14:30:00Z"};
}

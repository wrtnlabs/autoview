
import Component from "../components/119";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"seller","member":{"id":"member-UNIT-TEST-001","nickname":"sampleSellerMember","emails":[{"id":"email-001","value":"primary@example.com","created_at":"2025-05-18T09:31:00Z"},{"id":"email-002","value":"secondary@example.org","created_at":"2025-05-18T10:00:00Z"}],"created_at":"2025-05-18T09:30:00Z"},"customer":{"id":"customer-SESSION-001","channel":{"id":"channel-web-test-001","created_at":"2025-05-17T08:00:00Z","code":"WEB-TEST","name":"Web Store (Test)"},"external_user":{"id":"ext-user-001","citizen":{"id":"citizen-ext-002","created_at":"2025-05-19T11:55:00Z","mobile":"+821098765432","name":"Jane Smith (Sample)"},"created_at":"2025-05-19T11:50:00Z","uid":"ext-uid-123","application":"external-app-test","nickname":"ext_user_alpha","data":{"notes":"External service test data"}},"href":"https://www.example.com/shop/test-session","referrer":null,"ip":"203.0.113.45","created_at":"2025-05-19T12:00:00Z"},"citizen":{"id":"citizen-main-001","created_at":"2025-05-19T12:35:00Z","mobile":"+821012345678","name":"John Doe (Test)"},"id":"seller-UNIT-TEST-001","created_at":"2025-05-19T13:00:00Z"};
}

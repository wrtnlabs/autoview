
import Component from "../components/118";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"seller","member":{"id":"member_987654321","nickname":"TestSellerMember","emails":[{"id":"email_001","value":"seller.primary@example.com","created_at":"2024-11-15T09:35:00Z"},{"id":"email_002","value":"seller.secondary@example.com","created_at":"2024-11-16T10:00:00Z"}],"created_at":"2024-11-15T09:30:00Z"},"customer":{"id":"customer_123456789","channel":{"id":"channel_001","created_at":"2023-06-20T07:20:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":{"provider":"SampleProvider","external_id":"ext_user_1234"},"href":"https://www.example.com/store/visit?session=test123","referrer":"https://referrer.example.org/page","ip":"203.0.113.45","created_at":"2025-05-19T11:00:00Z"},"citizen":{"id":"citizen_98765","created_at":"2024-10-05T14:15:30Z","mobile":"010-1234-5678","name":"Test Citizen (Sample)"},"id":"seller_123456","created_at":"2024-12-02T12:00:00Z"};
}

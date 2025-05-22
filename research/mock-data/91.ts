
import Component from "../components/91";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"seller","member":{"id":"member-1234","nickname":"test_seller_member","emails":[{"id":"email-1","value":"seller.member@example.com","created_at":"2024-12-01T09:00:00Z"}],"created_at":"2024-12-01T09:00:00Z"},"customer":{"id":"customer-5678","channel":{"id":"channel-01","created_at":"2024-01-01T00:00:00Z","code":"WEB","name":"Web Storefront (Test)"},"external_user":null,"href":"https://www.example.com/shop?customer=5678","referrer":null,"ip":"192.0.2.123","created_at":"2025-05-19T10:00:00Z"},"citizen":{"id":"citizen-7890","created_at":"2024-11-15T14:20:00Z","mobile":"+1-555-0100","name":"Alice Smith (Test)"},"id":"seller-3000","created_at":"2025-01-10T08:30:00Z"},"id":"comment-1001","parent_id":null,"snapshots":[{"id":"snap-1001","created_at":"2025-05-19T15:45:00Z","format":"md","body":"Initial inquiry comment body for UI testing. All content is fictional.","files":[{"name":"upload","extension":"txt","url":"https://www.example.com/files/upload1.txt"}]},{"id":"snap-1002","created_at":"2025-05-19T16:00:00Z","format":"html","body":"<p>Updated comment body with <strong>HTML</strong> formatting for UI test.</p>","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/files/screenshot.png"},{"name":"document","extension":null,"url":"https://www.example.com/files/readme"}]}],"created_at":"2025-05-19T15:45:00Z"};
}

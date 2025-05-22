
import Component from "../components/148";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"seller","member":{"id":"member-1001","nickname":"seller_user_test","emails":[{"id":"email-1001","value":"seller.user@example.com","created_at":"2025-01-02T08:30:00Z"}],"created_at":"2025-01-01T10:00:00Z"},"customer":{"id":"customer-2002","channel":{"id":"channel-3003","created_at":"2025-01-01T00:00:00Z","code":"WEB_TEST","name":"Web Store Test Channel"},"external_user":null,"href":"https://www.example.com/shop?session=abc123test","referrer":"https://referrer.example.org/page","ip":"192.0.2.1","created_at":"2025-05-19T14:22:00Z"},"citizen":{"id":"citizen-4004","created_at":"2025-02-15T11:45:00Z","mobile":"012-3456-7890","name":"Sample Seller (Test Account)"},"id":"seller-invert-5005","created_at":"2025-05-18T09:30:00Z"},"id":"comment-701","parent_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","snapshots":[{"id":"snapshot-800","created_at":"2025-05-19T15:00:00Z","format":"md","body":"Initial sample comment content.\\nWith markdown **bold** and _italic_ for UI test.","files":[{"name":"diagram","extension":"png","url":"https://www.example.com/assets/diagram.png"}]},{"id":"snapshot-801","created_at":"2025-05-19T15:30:00Z","format":"txt","body":"Revised comment content (Test). No formatting here.","files":[]}],"created_at":"2025-05-19T16:00:00Z"};
}

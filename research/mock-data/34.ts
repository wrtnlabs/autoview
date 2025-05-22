
import Component from "../components/34";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"review","customer":{"type":"customer","member":null,"citizen":null,"id":"customer_001","channel":{"id":"channel_web","created_at":"2025-01-01T09:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/product/12345","referrer":"","ip":"203.0.113.45","created_at":"2025-05-19T14:00:00Z"},"answer":{"response":"Thank you for your review (Sample). We’re glad you liked the product.","responded_at":"2025-05-19T15:00:00Z"},"read_by_seller":true,"id":"review_abc123","snapshots":[{"score":5,"id":"snap1","created_at":"2025-05-19T14:30:00Z","format":"md","title":"Great product! (Test)","body":"I really loved using this product. It met all my expectations. (Test review)","files":[{"name":"photo1","extension":"jpg","url":"https://www.example.com/files/photo1.jpg"}]},{"score":4,"id":"snap2","created_at":"2025-05-20T10:15:00Z","format":"html","title":"Good product, minor issues (Edited)","body":"<p>I updated my review after further testing. The item is good but had minor delays in shipping. (Test edit)</p>","files":[{"name":"photo1","extension":"jpg","url":"https://www.example.com/files/photo1.jpg"},{"name":"receipt","extension":"pdf","url":"https://www.example.com/files/receipt.pdf"}]}],"created_at":"2025-05-19T14:30:00Z"};
}

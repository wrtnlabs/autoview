
import Component from "../components/102";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"review","customer":{"type":"customer","member":null,"citizen":null,"id":"customer-test-456","channel":{"id":"channel-test-123","created_at":"2025-05-10T08:00:00Z","code":"WEB_TEST","name":"Web Storefront (Test)"},"external_user":null,"href":"https://www.example.com/product/789","referrer":"https://www.example.com/home","ip":"203.0.113.45","created_at":"2025-05-19T14:30:00Z"},"answer":null,"read_by_seller":true,"id":"review-test-001","snapshots":[{"score":4,"id":"snapshot-test-001","created_at":"2025-05-19T14:30:00Z","format":"html","title":"Great Sample Product (Test Review)","body":"<p>This is a sample review body for testing UI rendering. All content is fictional and for demonstration only.</p>","files":[{"name":"review_photo_1","extension":"png","url":"https://cdn.example.com/sample/review_photo_1.png"},{"name":"receipt","extension":"pdf","url":"https://cdn.example.com/sample/receipt.pdf"}]},{"score":4.5,"id":"snapshot-test-002","created_at":"2025-05-20T09:15:00Z","format":"md","title":"Updated Test Review Title","body":"This is an updated sample review in markdown format.\n\n- Point one\n- Point two","files":[{"name":"update_document","extension":null,"url":"https://cdn.example.com/sample/update_document"}]}],"created_at":"2025-05-19T14:30:00Z"};
}

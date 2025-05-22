
import Component from "../components/100";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"review","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_conn_7890","channel":{"id":"chan_01","created_at":"2025-05-01T09:00:00Z","code":"WEB","name":"Web Store (Sample)"},"external_user":null,"href":"https://www.example.com/shop/products/sample-item","referrer":"https://www.example.org/homepage","ip":"192.0.2.1","created_at":"2025-05-19T14:00:00Z"},"answer":{"text":"Thank you for your feedback (Sample). We're glad you enjoyed the product.","answered_at":"2025-05-20T08:15:00Z"},"read_by_seller":true,"id":"rev_20250519_001","snapshots":[{"score":4,"id":"snap_20250519_001","created_at":"2025-05-19T14:30:00Z","format":"md","title":"Great product (Test Review)","body":"I really liked the quality and features of this item. Highly recommended! (Sample Review)","files":[{"name":"receipt","extension":"pdf","url":"https://www.example.com/files/receipt_sample_123.pdf"},{"name":"image1","extension":"jpg","url":"https://www.example.com/files/image1_test.jpg"}]},{"score":5,"id":"snap_20250520_001","created_at":"2025-05-20T07:45:00Z","format":"html","title":"Updated Review Title (Test)","body":"<p>I increased my rating after using it for a week. The durability is excellent. (Sample Update)</p>","files":[]}],"created_at":"2025-05-19T14:30:00Z"};
}

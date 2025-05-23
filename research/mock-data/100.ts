
import Component from "../components/100";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"review","customer":{"type":"customer","member":null,"citizen":{"id":"citizen-001","created_at":"2025-05-18T10:00:00Z","mobile":"010-1234-5678","name":"John Doe (Test)"},"id":"cust_001_test","channel":{"id":"channel-123","created_at":"2025-05-01T08:30:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop/12345?item=987","referrer":"https://referrer.example.org/path","ip":"203.0.113.5","created_at":"2025-05-18T10:00:00Z"},"answer":{"seller":{"id":"seller-987","created_at":"2025-05-17T09:00:00Z"},"id":"answer-456","snapshots":[{"id":"snapshot-answer-001","created_at":"2025-05-18T12:00:00Z","format":"md","title":"Answer to your review (Sample)","body":"Thank you for your review! We're glad you liked the product. (Test response)","files":[{"name":"review_attachment","extension":"jpg","url":"https://www.example.com/files/sample.jpg"},{"name":"spec","extension":null,"url":"https://docs.example.org/spec"}]}],"created_at":"2025-05-18T12:00:00Z"},"read_by_seller":true,"id":"review-001","snapshots":[{"score":5,"id":"snapshot-review-001","created_at":"2025-05-19T14:20:00Z","format":"txt","title":"Great product! (Test Review)","body":"I am very satisfied with this product. It meets all my expectations. (Sample review text)","files":[{"name":"image1","extension":"png","url":"https://www.example.com/images/review1.png"}]}],"created_at":"2025-05-19T14:25:00Z"};
}

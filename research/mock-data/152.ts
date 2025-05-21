
import Component from "../components/152";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"review","customer":{"type":"customer","member":null,"citizen":null,"id":"customer_7890","channel":{"id":"channel_001","created_at":"2025-01-01T12:00:00Z","code":"WEB","name":"Web (Sample Channel)"},"external_user":null,"href":"https://www.example.com/checkout","referrer":"https://www.example.com/home","ip":"192.0.2.123","created_at":"2025-05-19T14:29:00Z"},"answer":{"response":"Thank you for your feedback! We appreciate your review. (Sample Response)","responded_at":"2025-05-21T08:00:00Z"},"read_by_seller":true,"id":"review_123456","snapshots":[{"score":4,"id":"snapshot_001","created_at":"2025-05-19T14:30:00Z","format":"md","title":"Initial Review of Product XYZ (Sample)","body":"I liked the product overall. It performed as expected and met my needs. (Test Review Body)","files":[{"name":"review_notes","extension":"txt","url":"https://www.example.com/files/review_notes.txt"}]},{"score":5,"id":"snapshot_002","created_at":"2025-05-20T09:15:00Z","format":"html","title":"Updated Review After Further Use (Sample)","body":"<p>After using the product for another week, I found that it exceeded expectations! (Test Update)</p>","files":[{"name":"updated_feedback","extension":null,"url":"https://www.example.com/files/updated_feedback"},{"name":"detailed_report","extension":"pdf","url":"https://www.example.com/files/detailed_report.pdf"}]}],"created_at":"2025-05-19T14:30:00Z"};
}

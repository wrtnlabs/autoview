
import Component from "../components/143";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"secret":false,"type":"question","customer":{"type":"customer","member":null,"citizen":null,"id":"customer-789","channel":{"id":"channel-001","created_at":"2025-01-01T00:00:00Z","code":"web","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/products/sample-product","referrer":"https://www.example.com/home","ip":"203.0.113.5","created_at":"2025-05-19T11:59:00Z"},"answer":{"seller":{"id":"seller-123","created_at":"2025-01-10T09:30:00Z"},"id":"answer-001","snapshots":[{"id":"answer-snapshot-001","created_at":"2025-05-19T13:00:00Z","format":"txt","title":"Answer Title (Sample)","body":"Sample answer content for UI testing. (Fictional)","files":[{"name":"answer-image","extension":"jpg","url":"https://www.example.com/files/answer-image.jpg"}]}],"created_at":"2025-05-19T13:00:00Z"},"read_by_seller":true,"id":"question-001","snapshots":[{"id":"snapshot-001","created_at":"2025-05-19T12:00:00Z","format":"md","title":"Initial question title","body":"I have a question about the sample product. Is it available in blue? (Test)","files":[{"name":"specs","extension":"pdf","url":"https://www.example.com/files/specs.pdf"}]},{"id":"snapshot-002","created_at":"2025-05-19T12:05:00Z","format":"md","title":"Edited question title","body":"I have updated my question: Is the sample product available in blue or red? (Test)","files":[]}],"created_at":"2025-05-19T12:00:00Z"};
}

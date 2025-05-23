
import Component from "../components/27";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"secret":false,"type":"question","customer":{"type":"customer","member":null,"citizen":null,"id":"cust-456","channel":{"id":"channel-001","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/products/sample-product-123","referrer":"https://referrer.example.org/search?query=test","ip":"198.51.100.23","created_at":"2025-05-18T09:45:00Z"},"answer":{"seller":{"id":"seller-789","created_at":"2025-01-10T09:30:00Z"},"id":"answer-001","snapshots":[{"id":"snap-a1","created_at":"2025-05-18T12:00:00Z","format":"html","title":"Answer to sizing question (Test)","body":"Hello, thank you for your question. The product is available in sizes S, M, L, and XL. Please refer to the attached size chart. (Test)","files":[{"name":"size-chart","extension":"pdf","url":"https://www.example.com/files/size-chart-test.pdf"}]}],"created_at":"2025-05-18T12:00:00Z"},"read_by_seller":true,"id":"question-001","snapshots":[{"id":"snap-q1","created_at":"2025-05-18T10:00:00Z","format":"md","title":"Question about product size (Test)","body":"Hi, I would like to know more about the sizing options available for this product. Thank you. (Test)","files":[{"name":"size-chart","extension":"pdf","url":"https://www.example.com/files/size-chart-test.pdf"},{"name":"readme","extension":null,"url":"https://www.example.com/files/readme-test"}]}],"created_at":"2025-05-18T09:50:00Z"};
}

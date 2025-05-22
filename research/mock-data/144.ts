
import Component from "../components/144";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"seller":{"id":"seller-001-test","created_at":"2024-01-15T10:20:00Z"},"id":"answer-1001-sample","snapshots":[{"id":"snapshot-0001-test","created_at":"2025-05-18T09:15:00Z","format":"md","title":"Inquiry Response (Initial) (Sample)","body":"Thank you for your inquiry about the product. The item is in stock and will ship within 3-5 business days. (This is a sample response for UI testing.)","files":[{"name":"product-image","extension":"jpg","url":"https://www.example.com/files/sample-product-image.jpg"}]},{"id":"snapshot-0002-test","created_at":"2025-05-19T14:30:00Z","format":"html","title":"Inquiry Response (Updated) (Sample)","body":"<p>Thank you for your inquiry. We have confirmed that the product is available in red and blue colors. Please let us know your preference.</p><p><em>This content is fictional and for testing only.</em></p>","files":[{"name":"color-options","extension":"png","url":"https://www.example.com/files/sample-color-options.png"},{"name":"warranty-info","extension":null,"url":"https://www.example.com/files/sample-warranty-info"}]}],"created_at":"2025-05-19T14:30:00Z"};
}

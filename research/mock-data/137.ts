
import Component from "../components/137";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"seller":{"id":"seller-001-test","created_at":"2025-05-18T10:00:00Z"},"id":"answer-001-test","snapshots":[{"id":"snapshot-001-test","created_at":"2025-05-19T14:30:00Z","format":"md","title":"Initial Answer: Sample Product Inquiry (Test)","body":"Hello,\n\nThank you for contacting us about the sample product. Currently, it is in stock and ready to ship. This is a fictional response for UI testing purposes.\n\nBest regards,\nSample Seller (Test)","files":[]},{"id":"snapshot-002-test","created_at":"2025-05-19T15:00:00Z","format":"html","title":"Revised Answer: Sample Product Inquiry (Test)","body":"<p>Hello,</p><p>Thank you for your patience. The sample product is available and can be delivered within 3-5 business days.</p><p>Let us know if you need further assistance.</p><p>(Fictional data for testing UI.)</p>","files":[{"name":"spec-sheet","extension":"pdf","url":"https://www.example.com/files/spec-sheet.pdf"},{"name":"product-image","extension":"jpg","url":"https://www.example.com/files/product-image.jpg"}]}],"created_at":"2025-05-19T16:00:00Z"};
}

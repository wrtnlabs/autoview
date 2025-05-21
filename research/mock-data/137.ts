
import Component from "../components/137";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"seller":{"id":"seller_2002","created_at":"2025-01-10T08:00:00Z"},"id":"answer_1001","snapshots":[{"id":"snapshot_001","created_at":"2025-05-18T09:15:00Z","format":"md","title":"Answer Draft for Sale Inquiry #123 (Sample)","body":"Thank you for your inquiry regarding our sale item. This is a sample draft response created for UI testing purposes.","files":[{"name":"diagram","extension":"png","url":"https://www.example.com/files/diagram.png"}]},{"id":"snapshot_002","created_at":"2025-05-19T14:30:00Z","format":"html","title":"Official Answer to Sale Inquiry #123 (Sample)","body":"<p>Dear Customer,</p><p>We appreciate your interest in our product. The item is currently in stock and available for immediate shipment.</p><p>Best regards,<br/>Test Seller (Sample)</p>","files":[{"name":"invoice_sample","extension":"pdf","url":"https://www.example.com/files/invoice_sample.pdf"},{"name":"README_sample","extension":null,"url":"https://www.example.com/files/README_sample"}]}],"created_at":"2025-05-19T14:35:00Z"};
}

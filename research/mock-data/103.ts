
import Component from "../components/103";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"score":4.5,"id":"snapshot_001_test","created_at":"2025-05-19T14:30:00Z","format":"html","title":"Sample Review: Fictional Shopping Sale (Test)","body":"<p>This is a sample review of a fictional shopping event. It contains details about sales performance, customer engagement, and product highlights. All content is for UI testing purposes only.</p>","files":[{"name":"product_image_sample","extension":"jpg","url":"https://www.example.com/images/product_image_sample.jpg"},{"name":"sale_report_sample","extension":"md","url":"https://www.example.com/docs/sale_report_sample.md"},{"name":"invoice_sample","extension":"pdf","url":"https://www.example.com/files/invoice_sample.pdf"}]};
}

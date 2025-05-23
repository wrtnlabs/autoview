
import Component from "../components/26";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_001_test","created_at":"2025-05-19T14:30:00Z","format":"md","body":"## Sample Inquiry Comment\n\nThis is a *mock* customer inquiry snapshot for UI testing. It demonstrates markdown formatting and ensures no real data is exposed. Please ignore.","files":[{"name":"invoice_sample","extension":"pdf","url":"https://www.example.com/files/invoice_sample.pdf"},{"name":"screenshot_order","extension":"png","url":"https://www.example.com/files/screenshot_order.png"},{"name":"","extension":null,"url":"https://www.example.com/files/.gitignore"}]};
}

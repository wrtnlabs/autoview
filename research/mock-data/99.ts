
import Component from "../components/99";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_00123_test","created_at":"2025-05-19T14:30:00Z","format":"html","body":"<p>Hello, I have a question about the bulk pricing for product <strong>XYZ-100</strong>. Could you please provide your best offer? Thank you! (Sample Comment)</p>","files":[{"name":"screenshot_sale_inquiry","extension":"png","url":"https://www.example.com/files/screenshot_sale_inquiry.png"},{"name":"price_list","extension":"pdf","url":"https://www.example.com/files/price_list.pdf"},{"name":"README","extension":null,"url":"https://www.example.com/files/README"}]};
}

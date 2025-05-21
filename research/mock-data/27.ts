
import Component from "../components/27";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"secret":false,"type":"question","customer":{"type":"customer","member":null,"citizen":null,"id":"cust-0001-sample","channel":{"id":"chan-01-sample","created_at":"2025-05-01T08:00:00Z","code":"web_portal","name":"Web Portal (Sample)"},"external_user":null,"href":"https://www.example.com/shop?session=abc123dummy","referrer":"https://referrer.example.com/landing-page-test","ip":"203.0.113.45","created_at":"2025-05-18T09:00:00Z"},"answer":{"responded_at":"2025-05-18T10:00:00Z","message":"Yes, the item will be restocked tomorrow in size Medium and Blue. (Test response sample)"},"read_by_seller":true,"id":"qst-1001-sample","snapshots":[{"id":"snap-0001-sample","created_at":"2025-05-18T09:05:00Z","format":"md","title":"Question about item availability (Sample)","body":"Is this item available in size Medium? (Sample inquiry text.)","files":[]},{"id":"snap-0002-sample","created_at":"2025-05-18T09:10:00Z","format":"html","title":"Question about item availability and color (Sample)","body":"<p>Is this item available in size Medium and the color Blue? (Updated sample inquiry.)</p>","files":[{"name":"color-swatch","extension":"jpg","url":"https://example.com/files/color-swatch.jpg"}]}],"created_at":"2025-05-18T09:05:00Z"};
}

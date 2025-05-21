
import Component from "../components/93";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"secret":true,"type":"question","customer":{"type":"customer","member":null,"citizen":null,"id":"cust-001-test","channel":{"id":"chan-01","created_at":"2025-05-19T09:30:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop/test?session=abc123","referrer":"https://referrer.example.org/path/test","ip":"192.0.2.123","created_at":"2025-05-19T09:30:00Z"},"answer":null,"read_by_seller":false,"id":"inq-0001-test","snapshots":[{"id":"snap-0001","created_at":"2025-05-18T10:00:00Z","format":"md","title":"Initial Inquiry: Question About Test Product","body":"Hello,\nI have a question regarding the specifications of the Test Product (Sample). Could you clarify the dimensions in detail? Thank you.","files":[]},{"id":"snap-0002","created_at":"2025-05-18T10:15:00Z","format":"md","title":"Updated Inquiry: Question About Test Product","body":"Hello,\nI am interested in the Test Product (Sample). Could you please provide the exact dimensions (length, width, height) and weight? Thanks again.","files":[{"name":"dimensions","extension":"pdf","url":"https://www.example.com/files/dimensions-specs-test.pdf"}]}],"created_at":"2025-05-18T10:00:00Z"};
}

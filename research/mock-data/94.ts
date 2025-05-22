
import Component from "../components/94";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"secret":true,"type":"question","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_7890","channel":{"id":"chan_abc123","created_at":"2025-05-01T09:00:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop?p=test","referrer":"https://referrer.example.org/home","ip":"192.0.2.123","created_at":"2025-05-19T12:00:00Z"},"answer":{"response_id":"ans_0001","answered_at":"2025-05-20T08:30:00Z","content":"Thank you for your inquiry. The product weight is approx. 1.2kg (Test Data)."},"read_by_seller":false,"id":"qst_12345","snapshots":[{"id":"snap_001","created_at":"2025-05-19T12:01:00Z","format":"md","title":"Product Weight Inquiry (Test)","body":"Hello, can you tell me the exact weight of the product? (Sample Inquiry)","files":[]},{"id":"snap_002","created_at":"2025-05-19T12:05:00Z","format":"md","title":"Product Weight Inquiry (Edited) (Test)","body":"Edited: Please specify weight including packaging. (Sample Edit)","files":[{"name":"weight_chart","extension":"csv","url":"https://www.example.com/files/weight_chart.csv"},{"name":"","extension":null,"url":"https://www.example.com/files/.gitignore"}]}],"created_at":"2025-05-19T12:00:00Z"};
}


import Component from "../components/143";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"secret":false,"type":"question","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_conn_12345","channel":{"id":"chan_web_01","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":null,"href":"https://store.example.com/products/sample-item","referrer":"https://www.example.com/home","ip":"203.0.113.45","created_at":"2025-05-19T10:59:30Z"},"answer":{"text":"This is a sample answer for the inquiry. All data is for testing purposes only.","responded_at":"2025-05-20T08:00:00Z"},"read_by_seller":true,"id":"qst_sample_001","snapshots":[{"id":"snap_001","created_at":"2025-05-19T11:00:00Z","format":"md","title":"Sample question title (Test)","body":"I would like to know more about the product dimensions. Could you provide the exact measurements? This is a test inquiry.","files":[]},{"id":"snap_002","created_at":"2025-05-19T11:15:00Z","format":"md","title":"Revised sample question title (Test)","body":"I edited my question to add clarification: Please include width, height, and depth in centimeters. (Testing edit history)","files":[{"name":"dimensions_chart","extension":"pdf","url":"https://cdn.example.com/files/dimensions_chart.pdf"}]}],"created_at":"2025-05-19T11:00:00Z"};
}

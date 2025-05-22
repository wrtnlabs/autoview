
import Component from "../components/29";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"writer":{"type":"customer","member":null,"citizen":null,"id":"cust-001-test","channel":{"id":"chan-001-test","created_at":"2025-05-19T09:00:00Z","code":"WEB","name":"Web Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop/item/12345","referrer":"https://www.example.com/","ip":"192.0.2.1","created_at":"2025-05-19T09:01:00Z"},"id":"d3f50b40-4c3e-4e30-9a2d-abcdef123456","parent_id":null,"snapshots":[{"id":"snap-001-test","created_at":"2025-05-19T10:15:00Z","format":"md","body":"This is a sample inquiry comment for UI testing purposes. It covers typical usage in a sales inquiry thread. (Test)","files":[{"name":"attachment_sample","extension":"txt","url":"https://www.example.com/files/attachment_sample.txt"}]}],"created_at":"2025-05-19T10:15:00Z"}]};
}

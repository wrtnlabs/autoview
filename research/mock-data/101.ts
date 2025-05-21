
import Component from "../components/101";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"score":4.5,"customer":{"type":"customer","member":{"member_since":"2024-01-15T08:00:00Z","tier":"gold"},"citizen":null,"id":"cst_0001","channel":{"id":"chan_001","created_at":"2023-11-01T10:00:00Z","code":"WEB","name":"Web Shop (Test)"},"external_user":null,"href":"https://www.example.com/shop/item/98765?ref=test","referrer":"https://referrer.example.com/sample","ip":"203.0.113.42","created_at":"2025-05-19T09:12:34Z"},"answer":{"text":"Thank you for your review. We appreciate your feedback (Test)."},"read_by_seller":true,"id":"rev_1001","title":"Great Product (Sample Review)","created_at":"2025-05-18T12:00:00Z","updated_at":"2025-05-19T09:00:00Z"},{"score":3,"customer":{"type":"customer","member":null,"citizen":null,"id":"cst_0002","channel":{"id":"chan_002","created_at":"2025-02-20T14:30:00Z","code":"APP","name":"Mobile App (Test)"},"external_user":null,"href":"https://app.example.com/product/12345","referrer":"","ip":"192.0.2.100","created_at":"2025-05-19T07:45:10Z"},"answer":null,"read_by_seller":false,"id":"rev_1002","title":"Average Quality (Test)","created_at":"2025-05-19T08:30:00Z","updated_at":"2025-05-19T08:30:00Z"}]};
}

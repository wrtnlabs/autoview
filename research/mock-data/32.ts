
import Component from "../components/32";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":2,"limit":10,"records":25,"pages":3},"data":[{"score":4.5,"customer":{"type":"customer","member":null,"citizen":null,"id":"cust_001_sample","channel":{"id":"chan_001_test","created_at":"2025-05-18T09:15:00Z","code":"WEB","name":"Website (Test)"},"external_user":null,"href":"https://www.example.com/products/sample-product","referrer":"https://referrer.example.com/landing-page","ip":"203.0.113.45","created_at":"2025-05-18T09:14:50Z"},"answer":null,"read_by_seller":false,"id":"review_1001","title":"Great product quality (Test)","created_at":"2025-05-18T10:00:00Z","updated_at":"2025-05-18T10:15:00Z"},{"score":5,"customer":{"type":"customer","member":{"member_id":"member_abc123_test","member_since":"2024-11-01"},"citizen":null,"id":"cust_002_sample","channel":{"id":"chan_002_test","created_at":"2025-01-10T12:30:00Z","code":"APP","name":"Mobile App (Test)"},"external_user":null,"href":"https://app.example.com/product/sample-product","referrer":null,"ip":"2001:0db8:85a3:0000:0000:8a2e:0370:7334","created_at":"2025-01-10T12:30:05Z"},"answer":"Thank you for your positive feedback! (Test)","read_by_seller":true,"id":"review_1002","title":"Excellent service and delivery (Sample)","created_at":"2025-01-11T08:45:00Z","updated_at":"2025-01-11T09:00:00Z"}]};
}

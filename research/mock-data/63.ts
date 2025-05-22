
import Component from "../components/63";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":2,"pages":1},"data":[{"id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_record_001","channel":{"id":"b23e4567-e89b-12d3-a456-426614174000","created_at":"2025-01-01T10:00:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop?session=test123","referrer":"https://referrer.example.org/landing","ip":"192.0.2.123","created_at":"2025-05-19T14:30:00Z"},"publish":null,"created_at":"2025-05-19T14:30:00Z","value":25},{"id":"6c1a9f69-8d4b-4f0a-9d2f-1b2e3c4d5e6f","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_record_002","channel":{"id":"c34e5567-e89b-12d3-a456-426614174111","created_at":"2025-02-15T08:30:00Z","code":"MOB_TEST","name":"Mobile App (Test)"},"external_user":null,"href":"https://m.example.com/shop?session=test456","referrer":"","ip":"2001:0db8:85a3:0000:0000:8a2e:0370:7334","created_at":"2025-05-20T09:15:00Z"},"publish":null,"created_at":"2025-05-20T09:15:00Z","value":49.99}]};
}


import Component from "../components/52";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":null,"citizen":{"citizen_id":"CIT-2002","verified_at":"2025-03-20T09:45:00Z"},"id":"cust-2002-001","channel":{"id":"chan-web-01","created_at":"2024-01-01T08:00:00Z","code":"WEB","name":"Web Sample Channel"},"external_user":null,"href":"https://shopping.example.com/products/sample-item-123","referrer":"https://www.example.com/home","ip":"198.51.100.42","created_at":"2025-05-19T15:30:00Z"};
}


import Component from "../components/79";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"id":"order_test_0001","name":"Sample Order #0001 (Test)","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_test_001","channel":{"id":"chan_test_001","created_at":"2025-05-01T09:00:00Z","code":"WEB_TEST","name":"Web Test Channel (Sample)"},"external_user":null,"href":"https://www.example.com/test-cart","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-19T11:50:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":150,"deposit":0,"mileage":10,"ticket":0,"nominal":160,"real":150},"publish":null,"created_at":"2025-05-19T12:00:00Z"}]};
}


import Component from "../components/19";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"id":"order-001-test","name":"Sample Order 001 (Test)","customer":{"type":"customer","member":null,"citizen":null,"id":"cust-001-test","channel":{"id":"channel-01-test","created_at":"2025-01-01T00:00:00Z","code":"web-test","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop?session=test-session","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-19T12:00:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":0,"deposit":0,"mileage":0,"ticket":0,"nominal":0,"real":0},"publish":null,"created_at":"2025-05-19T12:00:00Z"}]};
}

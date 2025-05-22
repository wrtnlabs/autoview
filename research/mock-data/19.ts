
import Component from "../components/19";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"id":"order-0001","name":"Sample Order #1 (Test)","customer":{"type":"customer","member":null,"citizen":null,"id":"cust-0001","channel":{"id":"ch-001","created_at":"2025-05-19T00:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop?session=abc123test","referrer":"https://referrer.example.org/test-page","ip":"192.0.2.1","created_at":"2025-05-19T13:55:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":100,"deposit":0,"mileage":0,"ticket":0,"nominal":100,"real":100},"publish":null,"created_at":"2025-05-19T14:00:00Z"}]};
}

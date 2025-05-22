
import Component from "../components/79";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"id":"ORD-TEST-0001","name":"Sample Order (Test)","customer":{"type":"customer","member":null,"citizen":null,"id":"CUST-TEST-1001","channel":{"id":"CHAN-TEST-001","created_at":"2024-01-01T00:00:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/store/sample-cart","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-18T11:45:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":90,"deposit":0,"mileage":5,"ticket":0,"nominal":100,"real":95},"publish":null,"created_at":"2025-05-18T12:00:00Z"}]};
}

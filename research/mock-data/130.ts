
import Component from "../components/130";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"id":"order_test_001","name":"Sample Order (Test)","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_test_001","channel":{"id":"channel_test_001","created_at":"2025-05-18T09:00:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-19T13:00:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":100,"deposit":0,"mileage":5,"ticket":0,"nominal":105,"real":100},"publish":null,"created_at":"2025-05-19T14:30:00Z"}]};
}

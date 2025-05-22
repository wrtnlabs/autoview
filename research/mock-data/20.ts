
import Component from "../components/20";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"order_test_001","name":"Sample Order (Test)","customer":{"type":"customer","member":null,"citizen":null,"id":"customer_test_123","channel":{"id":"channel_web_01","created_at":"2025-05-18T10:00:00Z","code":"WEB","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/store/cart","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-19T15:00:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":100,"deposit":50,"mileage":10,"ticket":0,"nominal":180,"real":160},"publish":null,"created_at":"2025-05-19T15:30:00Z"};
}

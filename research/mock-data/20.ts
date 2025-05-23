
import Component from "../components/20";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"order_test_001","name":"Test Order #001","customer":{"type":"customer","member":null,"citizen":null,"id":"customer_test_001","channel":{"id":"channel_test_001","created_at":"2025-05-19T09:00:00Z","code":"WEB","name":"Website (Test)"},"external_user":null,"href":"https://www.example.com/shop","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-19T09:00:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":50,"deposit":0,"mileage":10,"ticket":0,"nominal":60,"real":50},"publish":null,"created_at":"2025-05-19T12:00:00Z"};
}

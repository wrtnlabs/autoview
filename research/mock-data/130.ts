
import Component from "../components/130";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"id":"order_0001","name":"Sample Order #1","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_0001","channel":{"id":"channel_01","created_at":"2025-01-01T00:00:00Z","code":"web","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop","referrer":"https://www.example.com","ip":"192.168.0.1","created_at":"2025-05-19T14:00:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":0,"deposit":0,"mileage":0,"ticket":0,"nominal":0,"real":0},"publish":null,"created_at":"2025-05-19T14:30:00Z"}]};
}

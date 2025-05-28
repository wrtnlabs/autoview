
import Component from "../components/19";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"id":"order_test_001","name":"Sample Order #001","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_test_123","channel":{"id":"channel_test_01","created_at":"2025-05-19T09:00:00Z","code":"WEB-TEST","name":"Web Test Channel"},"external_user":null,"href":"https://www.example.com/shop?session=test","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-19T09:05:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":0,"deposit":0,"mileage":0,"ticket":0,"nominal":0,"real":0},"publish":null,"created_at":"2025-05-19T09:05:00Z"}]};
}

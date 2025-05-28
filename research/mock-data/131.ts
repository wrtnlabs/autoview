
import Component from "../components/131";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"order_001_sample","name":"Sample Order #001","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_001_sample","channel":{"id":"chan_web_sample","created_at":"2025-05-19T11:00:00Z","code":"WEB_TEST","name":"Web Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop?session=abc123test","referrer":"https://referrer.example.org/home-test","ip":"203.0.113.5","created_at":"2025-05-19T11:50:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":0,"deposit":0,"mileage":0,"ticket":0,"nominal":0,"real":0},"publish":null,"created_at":"2025-05-19T12:00:00Z"};
}

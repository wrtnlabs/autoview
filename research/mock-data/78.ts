
import Component from "../components/78";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"order-sample-001","name":"Sample Order #001","customer":{"type":"customer","member":null,"citizen":null,"id":"customer-sample-123","channel":{"id":"channel-sample-1","created_at":"2025-05-19T14:00:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop","referrer":"https://www.example.com/","ip":"192.0.2.1","created_at":"2025-05-19T14:30:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":100,"deposit":0,"mileage":10,"ticket":0,"nominal":110,"real":100},"publish":null,"created_at":"2025-05-19T14:30:00Z"};
}

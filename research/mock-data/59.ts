
import Component from "../components/59";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"ticket_test_0001","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_test_1234","channel":{"id":"channel_test_001","created_at":"2025-05-18T09:30:00Z","code":"WEB_DESKTOP","name":"Web Desktop (Test)"},"external_user":null,"href":"https://www.example.com/shop?session=testSession123","referrer":"https://referrer.example.org/home","ip":"192.168.0.100","created_at":"2025-05-19T12:00:00Z"},"coupon":{"id":"coupon_test_5678","designer":{"id":"designer_001","name":"Designer Sample (Test)"},"inventory":{"volume":100,"volume_per_citizen":2},"criterias":[{"type":"funnel","description":"Sample funnel criteria (Test)"},{"type":"seller","description":"Sample seller criteria (Test)"}],"discount":{"type":"percent","amount":10},"restriction":{"access":"public","exclusive":false,"volume":100,"volume_per_citizen":1,"expired_in":30,"expired_at":"2025-06-18T23:59:59Z"},"name":"Spring Sample Discount (Test)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-05-31T23:59:59Z","created_at":"2025-04-25T08:15:00Z"},"created_at":"2025-05-19T12:05:00Z","expired_at":"2025-06-18T23:59:59Z"};
}

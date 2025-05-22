
import Component from "../components/84";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"ticket_payments":[{"id":"payment_001_test","ticket":{"id":"ticket_001_test","customer":{"type":"customer","member":null,"citizen":null,"id":"customer_001_test","channel":{"id":"channel_web_test","created_at":"2025-01-01T00:00:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/test_checkout","referrer":null,"ip":"192.0.2.123","created_at":"2025-05-19T11:00:00Z"},"coupon":{"id":"coupon_001_test","designer":{"id":"admin_001_test","created_at":"2025-05-01T09:00:00Z"},"inventory":{"volume":100,"volume_per_citizen":1},"criterias":[],"discount":{"unit":"amount","value":10,"threshold":null,"limit":null,"multiplicative":false},"restriction":{"access":"public","exclusive":false,"volume":null,"volume_per_citizen":null,"expired_in":null,"expired_at":"2025-06-01T00:00:00Z"},"name":"Sample Coupon (Test)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-06-01T00:00:00Z","created_at":"2025-05-01T09:00:00Z"},"created_at":"2025-05-19T11:10:00Z","expired_at":"2025-06-01T00:00:00Z"},"created_at":"2025-05-19T11:15:00Z"}],"cash":50,"deposit":0,"mileage":20,"ticket":10,"nominal":80,"real":60};
}

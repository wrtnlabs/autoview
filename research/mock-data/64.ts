
import Component from "../components/64";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"123e4567-e89b-12d3-a456-426614174000","customer":{"type":"customer","member":{"membership_id":"MEMBER1234 (Test)"},"citizen":{"citizen_id":"CITIZEN5678 (Sample)"},"id":"cust-001-test","channel":{"id":"channel-0001-test","created_at":"2025-05-19T14:00:00Z","code":"web_sample","name":"Web Storefront (Test)"},"external_user":null,"href":"https://www.example.com/shop/test-path?session=abc123","referrer":"https://referrer.example.com/start-page","ip":"192.0.2.123","created_at":"2025-05-19T14:29:00Z"},"publish":{"payment_method":"Test Card (Sample)","published_at":"2025-05-19T15:05:00Z"},"created_at":"2025-05-19T15:00:00Z","value":123.45};
}

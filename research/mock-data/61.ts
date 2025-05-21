
import Component from "../components/61";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"ticket_12345_test","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_67890_test","channel":{"id":"channel_001_test","created_at":"2025-05-19T12:00:00Z","code":"WEB_TEST","name":"Web (Test Channel)"},"external_user":null,"href":"https://www.example.com/shop?session=test123","referrer":null,"ip":"203.0.113.45","created_at":"2025-05-19T12:00:00Z"},"coupon":{"id":"coupon_ABC123_test","designer":{"name":"Coupon Designer Dummy"},"inventory":{"volume":1000,"volume_per_citizen":1},"criterias":[{"type":"funnel","value":"sample_funnel_condition"},{"type":"seller","value":"seller_test_condition"}],"discount":{"type":"percent","percent_off":10},"restriction":{"access":"public","exclusive":false,"volume":1000,"volume_per_citizen":1,"expired_in":30,"expired_at":null},"name":"10% Off Spring Sale (Test Coupon)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-06-01T00:00:00Z","created_at":"2025-04-15T09:30:00Z"},"created_at":"2025-05-19T12:05:00Z","expired_at":"2025-06-01T00:00:00Z"};
}

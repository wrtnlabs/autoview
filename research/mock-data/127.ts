
import Component from "../components/127";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_001_test","designer":{"id":"admin_001_test","created_at":"2025-01-10T08:00:00Z"},"inventory":{"volume":100,"volume_per_citizen":1},"criterias":[{"type":"section","direction":"include","sections":[{"id":"section_apple_test","code":"FRUIT01","name":"Fruit Corner (Test)","created_at":"2025-03-01T10:00:00Z"}]},{"type":"seller","direction":"exclude","sellers":[{"id":"seller_123_test","created_at":"2024-12-05T14:30:00Z"}]},{"type":"funnel","direction":"include","funnels":[{"kind":"url","value":"https://www.example.com/ref/path"},{"kind":"variable","key":"utm_source","value":"newsletter_test"}]}],"discount":{"unit":"amount","value":20,"threshold":100,"limit":50,"multiplicative":true},"restriction":{"access":"public","exclusive":false,"volume":100,"volume_per_citizen":1,"expired_in":30,"expired_at":"2025-06-15T23:59:59Z"},"name":"Summer Sale Discount Coupon (Test)","opened_at":"2025-05-20T00:00:00Z","closed_at":"2025-07-31T23:59:59Z","created_at":"2025-05-01T12:00:00Z"};
}

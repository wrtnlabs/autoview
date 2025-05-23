
import Component from "../components/5";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_123456_test","designer":{"id":"seller_001_test","created_at":"2025-05-10T09:00:00Z"},"inventory":{"volume":100,"volume_per_citizen":null},"criterias":[{"type":"section","direction":"include","sections":[{"id":"section_01_test","code":"FRUIT","name":"Fruit Corner (Test)","created_at":"2025-05-01T08:30:00Z"}]},{"type":"seller","direction":"exclude","sellers":[{"id":"seller_002_test","created_at":"2025-04-20T14:45:00Z"}]},{"type":"funnel","direction":"include","funnels":[{"kind":"url","value":"https://www.example.com/referral?source=test"},{"kind":"variable","key":"campaign_id","value":"CMP_TEST_001"}]}],"discount":{"unit":"percent","value":10,"threshold":50,"limit":null},"restriction":{"access":"public","exclusive":false,"volume":1000,"volume_per_citizen":2,"expired_in":null,"expired_at":"2025-12-31T23:59:59Z"},"name":"Summer Sale Discount (Test)","opened_at":"2025-06-01T00:00:00Z","closed_at":"2025-08-31T23:59:59Z","created_at":"2025-05-15T12:00:00Z"};
}

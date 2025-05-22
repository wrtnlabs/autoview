
import Component from "../components/7";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_1234_test","designer":{"id":"admin_abc_001","created_at":"2025-05-15T09:30:00Z"},"inventory":{"volume":100,"volume_per_citizen":2},"criterias":[{"type":"section","direction":"include","sections":[{"id":"section_001","code":"FRUIT_SEC","name":"Fruit Section (Test)","created_at":"2025-04-01T08:00:00Z"}]},{"type":"seller","direction":"exclude","sellers":[{"id":"seller_002_test","created_at":"2025-03-20T12:00:00Z"}]},{"type":"funnel","direction":"include","funnels":[{"kind":"url","value":"https://www.example.com/promo?campaign=test"},{"kind":"variable","key":"utm_source","value":"test_campaign"}]}],"discount":{"unit":"percent","value":15,"threshold":50,"limit":200},"restriction":{"access":"public","exclusive":false,"volume":500,"volume_per_citizen":5,"expired_in":30,"expired_at":"2025-06-30T23:59:59Z"},"name":"Spring Sale Discount (Test)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-05-31T23:59:59Z","created_at":"2025-04-15T07:45:00Z"};
}

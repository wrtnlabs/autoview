
import Component from "../components/58";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_test_001","designer":{"id":"seller123","created_at":"2025-01-10T12:00:00Z"},"inventory":{"volume":100,"volume_per_citizen":2},"criterias":[{"type":"section","direction":"include","sections":[{"id":"section001","code":"fruit","name":"Fruits Section (Test)","created_at":"2025-02-01T09:00:00Z"}]},{"type":"seller","direction":"exclude","sellers":[{"id":"seller456","created_at":"2025-01-12T11:11:11Z"}]},{"type":"funnel","direction":"include","funnels":[{"kind":"url","value":"https://www.example.com/promo?ref=test_campaign"},{"kind":"variable","key":"utm_source","value":"test_source"}]}],"discount":{"unit":"amount","value":20,"threshold":100,"limit":null,"multiplicative":false},"restriction":{"access":"public","exclusive":false,"volume":1000,"volume_per_citizen":2,"expired_in":30,"expired_at":null},"name":"Spring Sale Coupon (Test)","opened_at":"2025-04-01T00:00:00Z","closed_at":"2025-04-30T23:59:59Z","created_at":"2025-03-15T10:20:30Z"};
}

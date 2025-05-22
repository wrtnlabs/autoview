
import Component from "../components/129";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_001_test","designer":{"id":"adm_001_sample","created_at":"2025-04-01T09:00:00Z"},"inventory":{"volume":1000,"volume_per_citizen":2},"criterias":[{"type":"section","direction":"include","sections":[{"id":"sec_100_test","code":"FRUIT_SEC","name":"Fruit Section (Test)","created_at":"2025-01-15T12:00:00Z"}]},{"type":"seller","direction":"exclude","sellers":[{"id":"sel_200_sample","created_at":"2025-02-20T10:30:00Z"}]},{"type":"funnel","direction":"include","funnels":[{"kind":"referrer","value":"https://www.example.com/referral/sample"},{"kind":"variable","key":"utm_source","value":"newsletter_test"}]}],"discount":{"unit":"amount","value":500,"threshold":1000,"limit":5000,"multiplicative":false},"restriction":{"access":"public","exclusive":false,"volume":5000,"volume_per_citizen":3,"expired_in":30,"expired_at":"2025-08-31T23:59:59Z"},"name":"Summer Discount Test Coupon","opened_at":"2025-05-20T00:00:00Z","closed_at":"2025-08-01T00:00:00Z","created_at":"2025-05-01T08:45:00Z"};
}

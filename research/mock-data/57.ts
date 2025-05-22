
import Component from "../components/57";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"id":"coupon_abc123_test","designer":{"id":"admin_001_test","created_at":"2025-05-01T12:00:00Z"},"inventory":{"volume":100,"volume_per_citizen":1},"criterias":[{"type":"section","direction":"include","sections":[{"id":"sec_001_test","code":"FRUIT_SEC_SAMPLE","name":"Fruit Corner (Sample)","created_at":"2025-05-01T00:00:00Z"}]},{"type":"seller","direction":"exclude","sellers":[{"id":"seller_456_test","created_at":"2025-04-15T09:20:00Z"}]},{"type":"funnel","direction":"include","funnels":[{"kind":"url","value":"https://www.example.com/ref/test-campaign"},{"kind":"variable","key":"utm_source","value":"newsletter_test"}]}],"discount":{"unit":"percent","value":15,"threshold":100,"limit":null},"restriction":{"access":"public","exclusive":false,"volume":500,"volume_per_citizen":2,"expired_in":30,"expired_at":"2025-12-31T23:59:59Z"},"name":"Test Coupon Summer Sale (Sample)","opened_at":"2025-06-01T00:00:00Z","closed_at":"2025-08-31T23:59:59Z","created_at":"2025-05-19T14:30:00Z"}]};
}

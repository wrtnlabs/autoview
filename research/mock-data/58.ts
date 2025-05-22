
import Component from "../components/58";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_sample_001","designer":{"id":"admin_sample_01","created_at":"2025-04-01T10:15:00Z"},"inventory":{"volume":100,"volume_per_citizen":1},"criterias":[{"type":"section","direction":"include","sections":[{"id":"section_001","code":"FRUITS","name":"Fruit Corner (Sample)","created_at":"2025-05-01T08:00:00Z"}]},{"type":"funnel","direction":"exclude","funnels":[{"kind":"referrer","value":"https://www.example.com/referrer/sample-path"},{"kind":"variable","key":"campaign_id","value":"summer_promo_2025"}]}],"discount":{"unit":"amount","value":500,"threshold":2000,"limit":1000,"multiplicative":false},"restriction":{"access":"public","exclusive":false,"volume":500,"volume_per_citizen":2,"expired_in":30,"expired_at":null},"name":"Summer Sale Coupon (Sample)","opened_at":"2025-05-15T00:00:00Z","closed_at":"2025-06-15T23:59:59Z","created_at":"2025-05-10T09:00:00Z"};
}

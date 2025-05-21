
import Component from "../components/5";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_summer2025_test","designer":{"id":"designer_test_001","name":"Sample Designer (Test)"},"inventory":{"volume":5000,"volume_per_citizen":2},"criterias":[{"type":"SellerCriteria","seller_id":"seller_123_test"},{"type":"SaleCriteria","sale_id":"sale_789_test"},{"type":"FunnelCriteria","funnel":"email_promo_test"}],"discount":{"kind":"percent","value":15},"restriction":{"access":"public","exclusive":false,"volume":5000,"volume_per_citizen":2,"expired_in":30,"expired_at":"2025-12-31T23:59:59Z"},"name":"Summer Sale 2025 Discount (Sample)","opened_at":"2025-05-15T00:00:00Z","closed_at":"2025-06-30T23:59:59Z","created_at":"2025-05-01T08:30:00Z"};
}

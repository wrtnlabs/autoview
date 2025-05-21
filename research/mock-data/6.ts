
import Component from "../components/6";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"coupon_summer_test_001","designer":{"id":"designer123","name":"Sample Designer (Test)"},"inventory":{"volume":100,"volume_per_citizen":1},"criterias":[{"type":"seller","seller_id":"seller123","description":"Seller Criteria Sample (Test)"},{"type":"funnel","funnel_id":"funnelABC","description":"Funnel Criteria Sample (Test)"}],"discount":{"type":"percent","value":15},"restriction":{"access":"public","exclusive":false,"volume":null,"volume_per_citizen":1,"expired_in":null,"expired_at":"2025-06-30T23:59:59Z"},"name":"Summer Sale Coupon (Test)","opened_at":"2025-06-01T00:00:00Z","closed_at":"2025-06-15T23:59:59Z","created_at":"2025-05-19T08:30:00Z"},{"id":"coupon_fixed_test_002","designer":{"id":"designerXYZ","name":"Test Designer XYZ"},"inventory":{"volume":null,"volume_per_citizen":null},"criterias":[{"type":"section","section":"electronics","description":"Section Criteria Sample (Test)"}],"discount":{"type":"amount","value":500},"restriction":{"access":"private","exclusive":true,"volume":50,"volume_per_citizen":null,"expired_in":30,"expired_at":null},"name":"Fixed Discount Coupon (Test)","opened_at":null,"closed_at":null,"created_at":"2025-05-20T10:15:00Z"}]};
}

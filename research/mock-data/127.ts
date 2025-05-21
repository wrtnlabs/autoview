
import Component from "../components/127";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_001","designer":{"id":"designer_001","name":"Sample Designer (Test)"},"inventory":{"volume":1000,"volume_per_citizen":1},"criterias":[{"type":"seller","sellerId":"seller_123_sample"},{"type":"funnel","funnelCode":"funnel_xyz_test"}],"discount":{"type":"percent","percent":15},"restriction":{"access":"public","exclusive":false,"volume":500,"volume_per_citizen":1,"expired_in":30,"expired_at":"2025-12-31T23:59:59Z"},"name":"Sample Discount Coupon (Test)","opened_at":"2025-01-01T00:00:00Z","closed_at":"2025-06-30T23:59:59Z","created_at":"2024-12-01T12:00:00Z"};
}

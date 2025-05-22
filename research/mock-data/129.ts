
import Component from "../components/129";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_123456_sample","designer":{"id":"designer_001_sample","name":"Test Designer (Sample)"},"inventory":{"volume":1000,"volume_per_citizen":2},"criterias":[{"type":"seller","sellerId":"seller_789_sample"},{"type":"funnel","funnelId":"newsletter_signup_sample"},{"type":"sale","saleId":"sale_event_2025S1"}],"discount":{"type":"percent","value":15},"restriction":{"access":"public","exclusive":false,"volume":500,"volume_per_citizen":1,"expired_in":30,"expired_at":"2025-06-01T23:59:59Z"},"name":"Spring Sale 2025 (Sample)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-06-01T23:59:59Z","created_at":"2025-04-15T09:30:00Z"};
}

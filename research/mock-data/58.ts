
import Component from "../components/58";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_0001_test","designer":{"id":"designer_123_test","name":"Designer Sample (Test)"},"inventory":{"volume":500,"volume_per_citizen":5},"criterias":[{"type":"section","section_ids":[1001,1002]},{"type":"seller","seller_id":"seller_ABC_test"},{"type":"sale","sale_id":"sale_789_test"},{"type":"funnel","funnel_code":"funnel123_test"}],"discount":{"type":"percent","percentage":20},"restriction":{"access":"private","exclusive":true,"volume":1000,"volume_per_citizen":1,"expired_in":30,"expired_at":"2025-12-31T23:59:59Z"},"name":"Summer Sale Discount (Test)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-09-01T23:59:59Z","created_at":"2025-04-15T10:20:30Z"};
}

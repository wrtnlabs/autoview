
import Component from "../components/7";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_12345_test","designer":{"id":"designer_001","name":"Sample Designer (Test)"},"inventory":{"volume":1000,"volume_per_citizen":1},"criterias":[{"type":"section","sectionIds":["electronics","home_appliances"]},{"type":"seller","sellerId":"seller_ABC_sample"},{"type":"sale","minPurchaseAmount":20000},{"type":"funnel","funnelId":"funnel_test_001"}],"discount":{"type":"percent","percentOff":15},"restriction":{"access":"public","exclusive":false,"volume":1000,"volume_per_citizen":null,"expired_in":30,"expired_at":"2025-06-30T23:59:59Z"},"name":"Spring Sale Discount (Test)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-05-31T23:59:59Z","created_at":"2025-04-15T08:30:00Z"};
}

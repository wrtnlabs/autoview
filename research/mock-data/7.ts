
import Component from "../components/7";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_test_001","designer":{"id":"seller_test_001","created_at":"2025-01-01T09:00:00Z"},"inventory":{"volume":100,"volume_per_citizen":1},"criterias":[{"type":"section","direction":"include","sections":[{"id":"section_test_001","code":"FRT","name":"Fruit Corner (Test)","created_at":"2025-01-15T12:00:00Z"}]},{"type":"funnel","direction":"include","funnels":[{"kind":"referrer","value":"https://www.example.com/home"},{"kind":"variable","key":"utm_campaign","value":"spring_test"}]}],"discount":{"unit":"percent","value":15,"threshold":100,"limit":50},"restriction":{"access":"public","exclusive":false,"volume":100,"volume_per_citizen":1,"expired_in":30,"expired_at":"2025-06-01T00:00:00Z"},"name":"Spring Festival Discount (Test)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-05-31T23:59:59Z","created_at":"2025-04-01T08:30:00Z"};
}

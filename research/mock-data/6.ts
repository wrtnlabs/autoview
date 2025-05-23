
import Component from "../components/6";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"coupon_test_001","designer":{"id":"admin-001-test","created_at":"2025-02-15T10:00:00Z"},"inventory":{"volume":500,"volume_per_citizen":2},"criterias":[{"type":"section","direction":"include","sections":[{"id":"section-001","code":"FRUIT","name":"Fruit Corner (Test)","created_at":"2024-01-01T00:00:00Z"}]},{"type":"funnel","direction":"include","funnels":[{"kind":"url","value":"https://www.example.com/campaign/test-path"},{"kind":"variable","key":"promo_code","value":"TEST2025"}]}],"discount":{"unit":"amount","value":20,"threshold":100,"limit":50,"multiplicative":true},"restriction":{"access":"public","exclusive":false,"volume":1000,"volume_per_citizen":1,"expired_in":30,"expired_at":"2025-06-30T23:59:59Z"},"name":"Spring Festival Discount (Sample)","opened_at":"2025-05-20T00:00:00Z","closed_at":"2025-06-20T23:59:59Z","created_at":"2025-05-19T12:00:00Z"},{"id":"coupon_test_002","designer":{"id":"seller-123-sample","created_at":"2025-01-10T09:30:00Z"},"inventory":{"volume":null,"volume_per_citizen":null},"criterias":[],"discount":{"unit":"percent","value":15,"threshold":50,"limit":null},"restriction":{"access":"private","exclusive":true,"volume":null,"volume_per_citizen":null,"expired_in":null,"expired_at":null},"name":"Spring Sale 15% Off (Sample)","opened_at":null,"closed_at":null,"created_at":"2025-04-01T08:00:00Z"}]};
}

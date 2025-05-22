
import Component from "../components/128";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":20,"records":45,"pages":3},"data":[{"id":"CPN-TEST-001","designer":{"id":1001,"name":"Sample Designer (Test)","email":"designer.sample@example.com"},"inventory":{"volume":500,"volume_per_citizen":5},"criterias":[{"criterion_type":"seller","seller_id":3001},{"criterion_type":"funnel","funnel_name":"Sample Funnel (Test)"}],"discount":{"type":"percent","percent_off":15,"minimum_purchase_amount":50},"restriction":{"access":"public","exclusive":false,"volume":500,"volume_per_citizen":5,"expired_in":30,"expired_at":null},"name":"Spring Sale Discount (Test)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-06-01T23:59:59Z","created_at":"2025-04-15T12:34:56Z"},{"id":"CPN-TEST-002","designer":"Designer_Anonymous_Sample","inventory":{"volume":null,"volume_per_citizen":null},"criterias":[],"discount":{"type":"amount","amount_off":10,"minimum_purchase_amount":20},"restriction":{"access":"private","exclusive":true,"volume":null,"volume_per_citizen":1,"expired_in":null,"expired_at":"2025-12-31T23:59:59Z"},"name":"New User Welcome Discount (Sample)","opened_at":null,"closed_at":null,"created_at":"2025-02-10T08:00:00Z"}]};
}

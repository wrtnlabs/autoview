
import Component from "../components/57";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"coupon-001-sample","designer":{"name":"Test Designer (Sample)","id":"designer-001"},"inventory":{"volume":100,"volume_per_citizen":1},"criterias":[{"type":"seller","sellerId":"seller-123-test"},{"type":"funnel","source":"email_campaign_dummy"}],"discount":{"type":"percent","percent":15,"threshold":5000,"limit":2000},"restriction":{"access":"private","exclusive":true,"volume":500,"volume_per_citizen":2,"expired_in":30,"expired_at":"2025-03-15T23:59:59Z"},"name":"VIP Customer Exclusive (Sample)","opened_at":"2025-02-01T00:00:00Z","closed_at":"2025-02-28T23:59:59Z","created_at":"2025-01-15T08:30:00Z"},{"id":"coupon-002-sample","designer":"designer_dummy_002","inventory":{"volume":null,"volume_per_citizen":null},"criterias":[],"discount":{"type":"amount","amount":2000,"threshold":1000},"restriction":{"access":"public","exclusive":false,"volume":null,"volume_per_citizen":null,"expired_in":null,"expired_at":null},"name":"Spring Promotion (Test)","opened_at":null,"closed_at":null,"created_at":"2025-02-20T12:00:00Z"}]};
}

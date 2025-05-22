
import Component from "../components/127";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"coupon_001_test","designer":{"id":"admin_01_test","created_at":"2025-05-01T09:00:00Z"},"inventory":{"volume":100,"volume_per_citizen":1},"criterias":[{"sections":[{"id":"sec001","code":"FRUIT","name":"Fruit Corner (Test)","created_at":"2025-01-01T00:00:00Z"}],"type":"section","direction":"include"},{"funnels":[{"kind":"referrer","value":"https://www.example.com/ref/test-campaign"},{"kind":"variable","key":"utm_source","value":"newsletter_test"}],"type":"funnel","direction":"exclude"}],"discount":{"unit":"amount","value":500,"threshold":2000,"limit":5000,"multiplicative":true},"restriction":{"access":"public","exclusive":false,"volume":1000,"volume_per_citizen":2,"expired_in":30,"expired_at":"2025-06-30T23:59:59Z"},"name":"Spring Sale Coupon (Test)","opened_at":"2025-05-01T00:00:00Z","closed_at":"2025-05-31T23:59:59Z","created_at":"2025-04-15T12:30:00Z"};
}

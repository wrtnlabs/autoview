
import Component from "../components/70";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":2,"pages":1},"data":[{"id":"11111111-1111-1111-1111-111111111111","citizen":{"id":"citizen-sample-0001","created_at":"2025-01-10T08:00:00Z","mobile":"010-1234-5678","name":"Test User (Sample)"},"mileage":{"id":"33333333-3333-3333-3333-333333333333","value":200,"created_at":"2025-01-10T08:05:00Z","code":"EARN_ORDER_TEST","source":"TestStore (Online)","direction":1},"source_id":"22222222-2222-2222-2222-222222222222","value":200,"balance":200,"created_at":"2025-01-10T08:05:01Z"},{"id":"44444444-4444-4444-4444-444444444444","citizen":{"id":"citizen-sample-0001","created_at":"2025-01-10T08:00:00Z","mobile":"010-1234-5678","name":"Test User (Sample)"},"mileage":{"id":"66666666-6666-6666-6666-666666666666","value":50,"created_at":"2025-01-15T12:00:00Z","code":"REDEEM_ORDER_TEST","source":"TestRedeemSystem","direction":-1},"source_id":"55555555-5555-5555-5555-555555555555","value":50,"balance":150,"created_at":"2025-01-15T12:00:01Z"}]};
}

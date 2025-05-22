
import Component from "../components/71";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"de305d54-75b4-431b-adb2-eb6b9e546014","citizen":{"id":"CITIZEN-001-TEST","created_at":"2025-04-01T09:15:00Z","mobile":"010-1234-5678","name":"Test User (Sample)"},"mileage":{"id":"550e8400-e29b-41d4-a716-446655440000","value":200,"created_at":"2025-05-19T14:25:00Z","code":"ORDER_PAYMENT_TEST","source":"SYSTEM","direction":1},"source_id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","value":200,"balance":1200,"created_at":"2025-05-19T14:30:00Z"};
}

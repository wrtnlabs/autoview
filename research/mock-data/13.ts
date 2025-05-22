
import Component from "../components/13";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":2,"limit":3,"records":7,"pages":3},"data":[{"id":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11","value":150,"created_at":"2025-05-18T14:30:00Z","code":"MILEAGE_PURCHASE_SAMPLE","source":"TestOrder (Sample)","direction":1},{"id":"b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22","value":null,"created_at":"2025-05-15T08:00:00Z","code":"MILEAGE_EXPIRATION_DUMMY","source":"SampleExpiry","direction":-1},{"id":"c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33","value":75.5,"created_at":"2025-05-16T12:45:30Z","code":"MILEAGE_BONUS_TEST","source":"SurveySample","direction":1}]};
}

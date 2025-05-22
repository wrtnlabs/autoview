
import Component from "../components/70";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"550e8400-e29b-41d4-a716-446655440000","citizen":{"id":"CITIZEN-001-SAMPLE","created_at":"2025-05-19T09:00:00Z","mobile":"010-0000-0001","name":"Sample User One (Test)"},"mileage":{"id":"123e4567-e89b-12d3-a456-426614174001","value":50,"created_at":"2025-05-19T10:15:30Z","code":"PURCHASE_REWARD","source":"OrderService (Test)","direction":1},"source_id":"223e4567-e89b-12d3-a456-426614174002","value":50,"balance":200,"created_at":"2025-05-19T10:15:30Z"},{"id":"550e8400-e29b-41d4-a716-446655440001","citizen":{"id":"CITIZEN-002-SAMPLE","created_at":"2025-05-18T08:30:00Z","mobile":"010-0000-0002","name":"Sample User Two (Test)"},"mileage":{"id":"123e4567-e89b-12d3-a456-426614174003","value":null,"created_at":"2025-05-18T09:45:00Z","code":"POINT_EXPIRATION","source":"MileageSystem (Test)","direction":-1},"source_id":"223e4567-e89b-12d3-a456-426614174004","value":20,"balance":180,"created_at":"2025-05-18T09:45:00Z"}]};
}

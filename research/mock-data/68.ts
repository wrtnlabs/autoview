
import Component from "../components/68";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"550e8400-e29b-41d4-a716-446655440000","citizen":{"id":"CITIZEN_TEST_001","created_at":"2025-01-10T09:15:00Z","mobile":"010-9999-8888","name":"Sample User (Test)"},"deposit":{"id":"123e4567-e89b-12d3-a456-426614174000","created_at":"2025-05-18T16:45:00Z","code":"DEP2025TEST","source":"sample-shop-online","direction":1},"source_id":"987e6543-e21b-34d3-b654-123456789abc","value":50000,"balance":150000,"created_at":"2025-05-18T16:45:01Z"};
}

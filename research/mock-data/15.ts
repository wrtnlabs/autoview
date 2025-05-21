
import Component from "../components/15";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"123e4567-e89b-12d3-a456-426614174999","value":250,"created_at":"2025-05-19T14:30:00Z","code":"TRX-000123-TEST","source":"test-shop-frontend","direction":1};
}

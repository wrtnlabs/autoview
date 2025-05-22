
import Component from "../components/746";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"SAMPLE_VARIABLE_TEST","value":"dummy_value_123","created_at":"2025-05-15T08:30:00Z","updated_at":"2025-05-20T12:45:30Z"};
}

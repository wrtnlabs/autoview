
import Component from "../components/746";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"SAMPLE_TEST_VARIABLE","value":"dummy_value_for_testing","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T09:30:00Z"};
}

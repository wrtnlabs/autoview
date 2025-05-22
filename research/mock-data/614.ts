
import Component from "../components/614";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"variables":[{"name":"TEST_VARIABLE_1","value":"value1_test","created_at":"2025-05-18T12:00:00Z","updated_at":"2025-05-19T09:30:00Z"},{"name":"CONFIG_FLAG_SAMPLE","value":"enabled_test","created_at":"2025-05-17T08:45:00Z","updated_at":"2025-05-19T10:15:00Z"}]};
}

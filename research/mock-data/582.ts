
import Component from "../components/582";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"variables":[{"name":"TEST_VARIABLE_ONE","value":"value_one_sample","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T09:30:00Z"},{"name":"SAMPLE_API_KEY","value":"abc123samplekey","created_at":"2025-05-18T15:45:00Z","updated_at":"2025-05-19T10:05:00Z"}]};
}

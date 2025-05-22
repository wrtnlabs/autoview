
import Component from "../components/582";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"variables":[{"name":"SAMPLE_API_KEY","value":"abcd1234efgh5678","created_at":"2025-05-19T09:15:00Z","updated_at":"2025-05-19T09:20:00Z"},{"name":"TEST_ENVIRONMENT","value":"development","created_at":"2025-05-18T08:00:00Z","updated_at":"2025-05-19T10:00:00Z"}]};
}

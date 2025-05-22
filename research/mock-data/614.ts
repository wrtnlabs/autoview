
import Component from "../components/614";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"variables":[{"name":"API_TOKEN_TEST","value":"abc123def456_sample","created_at":"2025-05-19T09:15:00Z","updated_at":"2025-05-19T09:45:00Z"},{"name":"BUILD_ENV","value":"staging_test","created_at":"2025-05-18T12:00:00Z","updated_at":"2025-05-18T13:30:00Z"}]};
}

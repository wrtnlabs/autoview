
import Component from "../components/744";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"variables":[{"name":"API_TOKEN_TEST","value":"dummy-token-12345-test","created_at":"2025-05-18T14:22:00Z","updated_at":"2025-05-19T09:00:00Z"},{"name":"ENVIRONMENT_TEST","value":"staging-sample","created_at":"2025-05-17T08:15:00Z","updated_at":"2025-05-18T10:45:00Z"},{"name":"MAX_RETRIES_TEST","value":"5","created_at":"2025-05-19T00:00:00Z","updated_at":"2025-05-19T00:00:00Z"}]};
}

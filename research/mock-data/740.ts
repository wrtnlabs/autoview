
import Component from "../components/740";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"DATABASE_PASSWORD_TEST","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z"},{"name":"API_TOKEN_SAMPLE","created_at":"2025-05-18T08:00:00Z","updated_at":"2025-05-21T16:45:30Z"}]};
}

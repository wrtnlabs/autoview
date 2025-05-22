
import Component from "../components/581";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"secrets":[{"name":"API_KEY_TEST","created_at":"2025-01-05T08:00:00Z","updated_at":"2025-05-18T16:30:00Z"},{"name":"DATABASE_PASSWORD_SAMPLE","created_at":"2024-11-20T14:45:00Z","updated_at":"2025-03-22T10:15:30Z"},{"name":"OAUTH_TOKEN_DUMMY","created_at":"2023-07-15T16:20:45Z","updated_at":"2024-07-15T12:00:00Z"}]};
}

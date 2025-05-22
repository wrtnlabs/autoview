
import Component from "../components/581";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"ORG_SECRET_TOKEN_SAMPLE","created_at":"2025-05-15T09:15:00Z","updated_at":"2025-05-16T11:20:30Z"},{"name":"DEPLOY_KEY_TEST","created_at":"2025-04-01T08:00:00Z","updated_at":"2025-05-19T14:30:00Z"}]};
}

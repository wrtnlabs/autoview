
import Component from "../components/610";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"DEPLOY_TOKEN_SAMPLE","created_at":"2025-05-18T12:00:00Z","updated_at":"2025-05-19T14:30:00Z"},{"name":"API_KEY_DUMMY","created_at":"2025-05-17T08:15:30Z","updated_at":"2025-05-19T09:45:10Z"}]};
}

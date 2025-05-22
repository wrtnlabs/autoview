
import Component from "../components/410";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"SECRET_API_KEY_SAMPLE","created_at":"2025-05-17T09:30:00Z","updated_at":"2025-05-18T16:45:00Z","visibility":"all"},{"name":"DEPLOY_TOKEN_TEST","created_at":"2025-05-18T11:15:00Z","updated_at":"2025-05-19T08:20:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/actions/secrets/DEPLOY_TOKEN_TEST/repositories"}]};
}


import Component from "../components/410";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"ci_org_secret_token (Test)","created_at":"2025-05-18T09:00:00Z","updated_at":"2025-05-19T12:30:00Z","visibility":"all"},{"name":"deploy_key_dummy","created_at":"2025-05-17T08:15:30Z","updated_at":"2025-05-19T11:45:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/actions/secrets/deploy_key_dummy/repositories"}]};
}


import Component from "../components/410";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"secrets":[{"name":"CI_TOKEN_SECRET_SAMPLE","created_at":"2025-05-15T08:30:00Z","updated_at":"2025-05-18T12:45:00Z","visibility":"all"},{"name":"DEPLOY_KEY_SECRET_SAMPLE","created_at":"2025-05-16T09:15:00Z","updated_at":"2025-05-19T09:20:00Z","visibility":"private"},{"name":"SELECTED_REPOS_SECRET_SAMPLE","created_at":"2025-05-17T10:00:00Z","updated_at":"2025-05-19T11:00:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/actions/secrets/SELECTED_REPOS_SECRET_SAMPLE/selected_repositories"}]};
}

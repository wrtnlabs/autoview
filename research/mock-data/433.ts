
import Component from "../components/433";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"secrets":[{"name":"CI_DEPLOY_TOKEN_Test","created_at":"2025-05-18T12:00:00Z","updated_at":"2025-05-19T08:30:00Z","visibility":"all"},{"name":"STAGING_ENV_KEY_Sample","created_at":"2025-05-17T09:15:00Z","updated_at":"2025-05-18T16:45:00Z","visibility":"private"},{"name":"SELECTED_REPOS_SECRET_Dummy","created_at":"2025-05-19T10:00:00Z","updated_at":"2025-05-19T10:05:00Z","visibility":"selected","selected_repositories_url":"https://api.example.org/orgs/sample-org/codespaces/secrets/SELECTED_REPOS_SECRET_Dummy/repositories"}]};
}

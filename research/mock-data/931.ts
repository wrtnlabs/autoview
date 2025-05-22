
import Component from "../components/931";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"BUILD_TOKEN_TEST","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T08:15:00Z","visibility":"selected","selected_repositories_url":"https://api.github.com/orgs/sample-org/codespaces/secrets/BUILD_TOKEN_TEST/repositories"},{"name":"SSH_KEY_SAMPLE","created_at":"2025-04-10T09:00:00Z","updated_at":"2025-05-18T18:45:00Z","visibility":"all","selected_repositories_url":"https://api.github.com/orgs/sample-org/codespaces/secrets/SSH_KEY_SAMPLE/repositories"}]};
}

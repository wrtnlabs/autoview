
import Component from "../components/442";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"secrets":[{"name":"org-dependabot-secret-sample","created_at":"2025-05-10T08:15:30Z","updated_at":"2025-05-15T12:00:00Z","visibility":"all"},{"name":"selected-repo-secret-test","created_at":"2025-04-01T09:00:00Z","updated_at":"2025-05-18T17:45:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/dependabot/secrets/selected-repo-secret-test/repositories"},{"name":"private-dependabot-secret-test","created_at":"2025-03-20T11:30:00Z","updated_at":"2025-05-17T10:00:00Z","visibility":"private"}]};
}

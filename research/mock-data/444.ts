
import Component from "../components/444";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"org-dependabot-secret-test","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/dependabot/secrets/org-dependabot-secret-test/repositories"};
}

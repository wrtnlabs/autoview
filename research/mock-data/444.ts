
import Component from "../components/444";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"organization-dependabot-secret-sample","created_at":"2025-05-17T09:15:00Z","updated_at":"2025-05-19T14:30:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/example-org/dependabot/secrets/organization-dependabot-secret-sample/repositories"};
}

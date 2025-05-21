
import Component from "../components/412";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"sample_org_secret_token","created_at":"2025-05-19T09:30:00Z","updated_at":"2025-06-01T15:45:30Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/actions/secrets/sample_org_secret_token/repositories"};
}

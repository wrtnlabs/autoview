
import Component from "../components/412";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"org-secret-test-sample","created_at":"2025-05-18T10:15:00Z","updated_at":"2025-05-19T12:00:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/actions/secrets/org-secret-test-sample/selected_repositories"};
}


import Component from "../components/412";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"org_secret_test_sample","created_at":"2025-05-18T09:15:30Z","updated_at":"2025-05-19T10:45:00Z","visibility":"selected","selected_repositories_url":"https://api.github.com/orgs/sample-org/actions/secrets/org_secret_test_sample/repositories"};
}

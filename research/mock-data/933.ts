
import Component from "../components/933";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"SAMPLE_CODESPACE_SECRET_TEST","created_at":"2025-05-10T08:30:00Z","updated_at":"2025-05-15T14:45:00Z","visibility":"selected","selected_repositories_url":"https://api.github.com/orgs/example-org/codespaces/secrets/SAMPLE_CODESPACE_SECRET_TEST/repositories"};
}

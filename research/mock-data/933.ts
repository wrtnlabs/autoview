
import Component from "../components/933";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"sample_codespace_secret (Test)","created_at":"2025-05-18T10:15:30Z","updated_at":"2025-05-19T14:30:00Z","visibility":"selected","selected_repositories_url":"https://api.github.com/orgs/example-org/codespaces/secrets/sample_codespace_secret/repositories"};
}

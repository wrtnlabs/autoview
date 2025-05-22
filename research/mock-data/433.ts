
import Component from "../components/433";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"secrets":[{"name":"SAMPLE_SECRET_TOKEN","created_at":"2025-05-18T09:15:30Z","updated_at":"2025-05-19T14:30:00Z","visibility":"all"},{"name":"SAMPLE_SECRET_RESTRICTED","created_at":"2025-05-17T08:00:00Z","updated_at":"2025-05-19T10:45:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/codespaces/secrets/SAMPLE_SECRET_RESTRICTED/repositories"},{"name":"SAMPLE_SECRET_PRIVATE","created_at":"2025-05-16T12:00:00Z","updated_at":"2025-05-18T16:20:00Z","visibility":"private"}]};
}

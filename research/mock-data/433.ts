
import Component from "../components/433";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"SAMPLE_SECRET_ALL (Test)","created_at":"2025-05-18T09:15:00Z","updated_at":"2025-05-19T12:00:00Z","visibility":"all"},{"name":"ORG_SECRET_SELECTED_SAMPLE","created_at":"2025-05-17T08:00:00Z","updated_at":"2025-05-20T16:45:30Z","visibility":"selected","selected_repositories_url":"https://api.example.org/orgs/sample-org/secrets/ORG_SECRET_SELECTED_SAMPLE/repositories"}]};
}

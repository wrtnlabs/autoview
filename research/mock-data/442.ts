
import Component from "../components/442";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"TEST_ORG_DEPENDABOT_SECRET_SAMPLE","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z","visibility":"all"},{"name":"SAMPLE_SECRET_SELECTED","created_at":"2025-05-18T08:00:00Z","updated_at":"2025-05-19T12:45:30Z","visibility":"selected","selected_repositories_url":"https://api.example.org/orgs/sample-org/dependabot/secrets/SAMPLE_SECRET_SELECTED/repositories"}]};
}

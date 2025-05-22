
import Component from "../components/417";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"SAMPLE_ORG_VAR","value":"dummy_value_123","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:00:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/actions/variables/SAMPLE_ORG_VAR/selected-repositories"};
}

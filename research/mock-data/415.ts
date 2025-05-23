
import Component from "../components/415";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"variables":[{"name":"API_TOKEN","value":"dummy_token_ABC123xyz","created_at":"2025-05-17T10:00:00Z","updated_at":"2025-05-18T11:30:00Z","visibility":"private"},{"name":"DEPLOY_ENV","value":"production_dummy","created_at":"2025-05-18T09:15:00Z","updated_at":"2025-05-19T14:30:00Z","visibility":"all"},{"name":"SELECTED_VAR","value":"selected_value_sample","created_at":"2025-05-19T08:00:00Z","updated_at":"2025-05-19T12:45:00Z","visibility":"selected","selected_repositories_url":"https://api.example.org/orgs/example-org/actions/variables/SELECTED_VAR/repositories"}]};
}

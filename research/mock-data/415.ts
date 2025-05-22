
import Component from "../components/415";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"variables":[{"name":"API_TOKEN_TEST","value":"dummy_token_1234_sample","created_at":"2025-04-10T09:30:00Z","updated_at":"2025-04-15T11:45:00Z","visibility":"all"},{"name":"DB_CONNECTION_STRING","value":"Server=test-db.example.com;Database=sample_db;User Id=test_user;Password=TestPass!23;","created_at":"2025-03-01T08:00:00Z","updated_at":"2025-05-01T08:00:00Z","visibility":"private"},{"name":"SELECTED_REPO_VAR","value":"sample_value_789","created_at":"2025-02-20T14:20:00Z","updated_at":"2025-05-19T16:45:30Z","visibility":"selected","selected_repositories_url":"https://api.example.org/v1/orgs/sample-org/selected-repositories"}]};
}

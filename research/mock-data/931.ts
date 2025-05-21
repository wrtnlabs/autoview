
import Component from "../components/931";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"secrets":[{"name":"SAMPLE_TOKEN_TEST","created_at":"2025-05-19T09:15:00Z","updated_at":"2025-05-20T10:20:45Z","visibility":"all","selected_repositories_url":"https://api.example.com/v1/users/sample-user/codespaces/secrets/SAMPLE_TOKEN_TEST/repositories"},{"name":"DUMMY_SECRET_KEY","created_at":"2024-12-01T14:22:30Z","updated_at":"2025-01-02T08:10:05Z","visibility":"private","selected_repositories_url":"https://api.example.com/v1/users/sample-user/codespaces/secrets/DUMMY_SECRET_KEY/repositories"},{"name":"DEMO_SECRET_SAMPLE","created_at":"2025-03-15T07:45:00Z","updated_at":"2025-04-10T12:00:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/v1/users/sample-user/codespaces/secrets/DEMO_SECRET_SAMPLE/repositories"}]};
}

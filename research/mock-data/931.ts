
import Component from "../components/931";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"secrets":[{"name":"SAMPLE_SECRET_ALL","created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-19T12:30:00Z","visibility":"all","selected_repositories_url":"https://api.example.com/user/codespaces/secrets/SAMPLE_SECRET_ALL/repositories"},{"name":"PRIVATE_SECRET_TEST","created_at":"2025-05-18T09:15:00Z","updated_at":"2025-05-18T10:45:00Z","visibility":"private","selected_repositories_url":"https://api.example.com/user/codespaces/secrets/PRIVATE_SECRET_TEST/repositories"},{"name":"SELECTED_SECRET_SAMPLE","created_at":"2025-05-17T08:00:00Z","updated_at":"2025-05-17T08:05:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/user/codespaces/secrets/SELECTED_SECRET_SAMPLE/repositories"}]};
}

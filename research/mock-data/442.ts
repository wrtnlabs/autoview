
import Component from "../components/442";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"secrets":[{"name":"dependabot_secret_alpha_sample","created_at":"2025-05-18T09:00:00Z","updated_at":"2025-05-19T11:30:00Z","visibility":"all"},{"name":"dependabot_secret_beta_dummy","created_at":"2025-05-17T14:15:00Z","updated_at":"2025-05-17T16:45:00Z","visibility":"private"},{"name":"dependabot_secret_gamma_selected_test","created_at":"2025-05-16T08:20:00Z","updated_at":"2025-05-19T13:50:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/dependabot/secrets/dependabot_secret_gamma_selected_test/selected_repositories"}]};
}

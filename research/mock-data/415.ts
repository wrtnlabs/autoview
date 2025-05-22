
import Component from "../components/415";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"variables":[{"name":"SAMPLE_VAR_API_KEY","value":"dummy_api_key_12345_sample","created_at":"2025-05-19T08:15:00Z","updated_at":"2025-05-19T12:30:45Z","visibility":"all"},{"name":"SAMPLE_SECRET_TOKEN","value":"dummy_secret_token_xyz_789","created_at":"2025-04-01T09:00:00Z","updated_at":"2025-05-19T09:15:30Z","visibility":"private"},{"name":"SAMPLE_DEPLOY_SCOPE","value":"production","created_at":"2025-05-18T14:20:00Z","updated_at":"2025-05-19T10:00:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/actions/variables/SAMPLE_DEPLOY_SCOPE/selected_repositories"}]};
}

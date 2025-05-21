
import Component from "../components/582";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"variables":[{"name":"API_TOKEN_SAMPLE","value":"dummy_api_token_ABC123","created_at":"2025-04-01T10:00:00Z","updated_at":"2025-05-19T14:30:00Z"},{"name":"DEPLOY_ENVIRONMENT_SAMPLE","value":"staging-test","created_at":"2025-03-15T08:15:00Z","updated_at":"2025-05-18T09:45:00Z"},{"name":"SSH_KEY_SAMPLE","value":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD3dummykeyexample","created_at":"2025-05-01T12:00:00Z","updated_at":"2025-05-19T16:20:00Z"}]};
}


import Component from "../components/996";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":13579,"account":{"description":"Sample Enterprise for testing purposes (Test Data)","html_url":"https://github.com/enterprises/sample-enterprise","website_url":"https://www.sample-enterprise.example.com","id":99999,"node_id":"ENT_kgDOExampleNode123","name":"Sample Enterprise (Test)","slug":"sample-enterprise","created_at":"2025-01-10T09:00:00Z","updated_at":"2025-04-15T12:45:00Z","avatar_url":"https://avatars.example.com/u/99999?v=4"},"repository_selection":"all","access_tokens_url":"https://api.github.com/app/installations/13579/access_tokens","repositories_url":"https://api.github.com/app/installations/13579/repositories","html_url":"https://github.com/apps/sample-ci-bot/installations/13579","app_id":24680,"target_id":22222,"target_type":"Organization","permissions":{"actions":"write","administration":"read","checks":"write","contents":"read","metadata":"read","issues":"write","pull_requests":"read","deployments":"read"},"events":["push","pull_request","issues"],"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:00:00Z","single_file_name":null,"app_slug":"sample-ci-bot","suspended_by":null,"suspended_at":null,"contact_email":"support@sample-enterprise.example.org"};
}

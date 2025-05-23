
import Component from "../components/467";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"account":{"description":"This is a sample enterprise account for testing.","html_url":"https://github.com/enterprises/sample-enterprise","website_url":"https://www.sample-enterprise.example.org","id":98765,"node_id":"ENPGR_SampleEnterpriseNodeID","name":"Sample Enterprise (Test)","slug":"sample-enterprise","created_at":"2024-01-01T00:00:00Z","updated_at":"2025-01-01T00:00:00Z","avatar_url":"https://avatars.githubusercontent.com/u/98765?v=4"},"repository_selection":"selected","access_tokens_url":"https://api.github.com/app/installations/42/access_tokens","repositories_url":"https://api.github.com/app/installations/42/repositories","html_url":"https://github.com/organizations/sample-org/settings/installations/42","app_id":55,"target_id":1001,"target_type":"Organization","permissions":{"actions":"read","contents":"write","deployments":"read","issues":"write","metadata":"read","pull_requests":"read","administration":"write","repository_projects":"admin","workflows":"write"},"events":["push","pull_request","issues"],"created_at":"2025-05-19T12:34:56Z","updated_at":"2025-05-20T08:00:00Z","single_file_name":"config.yml","has_multiple_single_files":true,"single_file_paths":["config.yml",".github/config.yml"],"app_slug":"sample-app","suspended_by":null,"suspended_at":null,"contact_email":"support+installation@example.com"};
}

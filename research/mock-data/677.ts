
import Component from "../components/677";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123,"name":"Sample CodeQL Database (Test)","language":"javascript","uploader":{"name":"Test User (Dev)","email":"test.user@example.com","login":"test-user-sample","id":456,"node_id":"NODEID_TestUser456","avatar_url":"https://avatars.example.com/u/456?v=4","gravatar_id":null,"url":"https://api.example.com/users/test-user-sample","html_url":"https://www.example.com/test-user-sample","followers_url":"https://api.example.com/users/test-user-sample/followers","following_url":"https://api.example.com/users/test-user-sample/following","gists_url":"https://api.example.com/users/test-user-sample/gists","starred_url":"https://api.example.com/users/test-user-sample/starred","subscriptions_url":"https://api.example.com/users/test-user-sample/subscriptions","organizations_url":"https://api.example.com/users/test-user-sample/orgs","repos_url":"https://api.example.com/users/test-user-sample/repos","events_url":"https://api.example.com/users/test-user-sample/events","received_events_url":"https://api.example.com/users/test-user-sample/received_events","type":"User","site_admin":false,"starred_at":"2025-05-10T09:00:00Z","user_view_type":"member"},"content_type":"application/zip","size":2048,"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:45:00Z","url":"https://api.example.com/codeql/databases/123/download","commit_oid":"abcdef1234567890abcdef1234567890abcdef12"};
}

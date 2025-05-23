
import Component from "../components/351";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"url":"https://api.example.com/gists/sample123/commits/1","version":"1","user":{"name":"Sample User (Test)","email":"test.user@example.com","login":"sample-user-test","id":1024,"node_id":"NODEID_SampleUser_ABC123==","avatar_url":"https://avatars.example.com/u/1024?v=4","gravatar_id":null,"url":"https://api.example.com/users/sample-user-test","html_url":"https://www.example.com/sample-user-test","followers_url":"https://api.example.com/users/sample-user-test/followers","following_url":"https://api.example.com/users/sample-user-test/following","gists_url":"https://api.example.com/users/sample-user-test/gists","starred_url":"https://api.example.com/users/sample-user-test/starred","subscriptions_url":"https://api.example.com/users/sample-user-test/subscriptions","organizations_url":"https://api.example.com/users/sample-user-test/orgs","repos_url":"https://api.example.com/users/sample-user-test/repos","events_url":"https://api.example.com/users/sample-user-test/events","received_events_url":"https://api.example.com/users/sample-user-test/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T07:22:33Z","user_view_type":"detailed"},"change_status":{"total":12,"additions":8,"deletions":4},"committed_at":"2025-05-19T12:34:56Z"},{"url":"https://api.example.com/gists/sample5678/commits/2","version":"2","user":null,"change_status":{"total":5,"additions":4},"committed_at":"2025-05-20T09:15:00Z"}];
}


import Component from "../components/351";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"url":"https://api.example.com/gists/sample-gist-id/commits/1","version":"v1.0.0-sample","user":{"name":"Sample User (Test)","email":"sample.user@example.com","login":"sample_user","id":5467,"node_id":"NODEID_SampleUser_123=","avatar_url":"https://avatars.example.com/u/5467?v=4","gravatar_id":null,"url":"https://api.example.com/users/sample_user","html_url":"https://www.example.com/sample_user","followers_url":"https://api.example.com/users/sample_user/followers","following_url":"https://api.example.com/users/sample_user/following{/other_user}","gists_url":"https://api.example.com/users/sample_user/gists{/gist_id}","starred_url":"https://api.example.com/users/sample_user/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample_user/subscriptions","organizations_url":"https://api.example.com/users/sample_user/orgs","repos_url":"https://api.example.com/users/sample_user/repos","events_url":"https://api.example.com/users/sample_user/events{/privacy}","received_events_url":"https://api.example.com/users/sample_user/received_events","type":"User","site_admin":false,"starred_at":"2025-05-19T13:00:00Z","user_view_type":"profile"},"change_status":{"total":10,"additions":15,"deletions":5},"committed_at":"2025-05-19T12:34:56Z"},{"url":"https://api.example.com/gists/sample-gist-id/commits/2","version":"v1.0.1-test","user":null,"change_status":{"additions":5},"committed_at":"2025-05-18T09:10:11Z"}];
}

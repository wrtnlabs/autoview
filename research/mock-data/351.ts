
import Component from "../components/351";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"url":"https://api.github.com/gists/abcdef1234567890/commits/1a2b3c4d5e","version":"1a2b3c4d5e","user":{"name":"Sample User (Test)","email":"sample.user@example.com","login":"sample-user","id":101,"node_id":"MDQ6VXNlcjEyMzQ1Njc=","avatar_url":"https://avatars.example.com/u/101?v=4","gravatar_id":null,"url":"https://api.github.com/users/sample-user","html_url":"https://github.com/sample-user","followers_url":"https://api.github.com/users/sample-user/followers","following_url":"https://api.github.com/users/sample-user/following{/other_user}","gists_url":"https://api.github.com/users/sample-user/gists{/gist_id}","starred_url":"https://api.github.com/users/sample-user/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/sample-user/subscriptions","organizations_url":"https://api.github.com/users/sample-user/orgs","repos_url":"https://api.github.com/users/sample-user/repos","events_url":"https://api.github.com/users/sample-user/events{/privacy}","received_events_url":"https://api.github.com/users/sample-user/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T09:13:00Z","user_view_type":"mini"},"change_status":{"total":5,"additions":10,"deletions":2},"committed_at":"2025-05-18T12:00:00Z"},{"url":"https://api.github.com/gists/abcdef1234567890/commits/6f7g8h9i0j","version":"6f7g8h9i0j","user":null,"change_status":{},"committed_at":"2025-05-19T08:30:00Z"}];
}

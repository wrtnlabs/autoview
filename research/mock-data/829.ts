
import Component from "../components/829";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDg6UmVhY3Rpb24xMDE=","user":{"login":"test.user","id":202,"node_id":"MDQ6VXNlcjIwMg==","avatar_url":"https://avatars.example.com/u/202?v=4","gravatar_id":null,"url":"https://api.github.com/users/test.user","html_url":"https://github.com/test.user","followers_url":"https://api.github.com/users/test.user/followers","following_url":"https://api.github.com/users/test.user/following{/other_user}","gists_url":"https://api.github.com/users/test.user/gists{/gist_id}","starred_url":"https://api.github.com/users/test.user/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/test.user/subscriptions","organizations_url":"https://api.github.com/users/test.user/orgs","repos_url":"https://api.github.com/users/test.user/repos","events_url":"https://api.github.com/users/test.user/events{/privacy}","received_events_url":"https://api.github.com/users/test.user/received_events","type":"User","site_admin":false,"name":"Test User (Dev)","email":"test.user@example.com","starred_at":"2025-05-19T12:34:56Z","user_view_type":"public"},"content":"+1","created_at":"2025-05-19T14:30:00Z"},{"id":102,"node_id":"MDg6UmVhY3Rpb24xMDI=","user":null,"content":"heart","created_at":"2025-05-19T15:00:00Z"}];
}

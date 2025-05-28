
import Component from "../components/914";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDg6UmVhY3Rpb24xMDE=","user":{"login":"sample-user","id":501,"node_id":"MDQ6VXNlcjUwMQ==","avatar_url":"https://avatars.example.com/u/501?v=4","gravatar_id":null,"url":"https://api.example.org/users/sample-user","html_url":"https://github.com/sample-user","followers_url":"https://api.example.org/users/sample-user/followers","following_url":"https://api.example.org/users/sample-user/following{/other_user}","gists_url":"https://api.example.org/users/sample-user/gists{/gist_id}","starred_url":"https://api.example.org/users/sample-user/starred{/owner}{/repo}","subscriptions_url":"https://api.example.org/users/sample-user/subscriptions","organizations_url":"https://api.example.org/users/sample-user/orgs","repos_url":"https://api.example.org/users/sample-user/repos","events_url":"https://api.example.org/users/sample-user/events{/privacy}","received_events_url":"https://api.example.org/users/sample-user/received_events","type":"User","site_admin":false,"name":"Sample User (Test)","email":"test.user@example.com","starred_at":"2025-05-18T12:00:00Z","user_view_type":"detailed"},"content":"heart","created_at":"2025-05-19T14:30:00Z"},{"id":102,"node_id":"MDg6UmVhY3Rpb24xMDI=","user":null,"content":"laugh","created_at":"2025-05-19T15:00:00Z"}];
}

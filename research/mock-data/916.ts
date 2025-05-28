
import Component from "../components/916";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDEyOlJlYWN0aW9uMTAx","user":{"name":"Sample User (Test)","email":"sample.user@example.com","login":"sample-user","id":123,"node_id":"MDQ6VXNlcjEyMw==","avatar_url":"https://api.example.com/avatars/sample-user.png","gravatar_id":null,"url":"https://api.example.com/users/sample-user","html_url":"https://www.example.com/sample-user","followers_url":"https://api.example.com/users/sample-user/followers","following_url":"https://api.example.com/users/sample-user/following{/other_user}","gists_url":"https://api.example.com/users/sample-user/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-user/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-user/subscriptions","organizations_url":"https://api.example.com/users/sample-user/orgs","repos_url":"https://api.example.com/users/sample-user/repos","events_url":"https://api.example.com/users/sample-user/events{/privacy}","received_events_url":"https://api.example.com/users/sample-user/received_events","type":"User","site_admin":false,"starred_at":"2025-05-19T12:00:00Z","user_view_type":"public"},"content":"heart","created_at":"2025-05-19T09:15:30Z"},{"id":102,"node_id":"MDEyOlJlYWN0aW9uMTAy","user":null,"content":"eyes","created_at":"2025-05-19T10:00:00Z"}];
}

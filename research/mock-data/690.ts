
import Component from "../components/690";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"billable_owner":{"name":"Test User (Dev)","email":"test.user@example.com","login":"testuser123","id":101,"node_id":"MDQ6VXNlcjEwMQ==","avatar_url":"https://www.example.com/avatars/testuser123.png","gravatar_id":null,"url":"https://api.example.com/users/testuser123","html_url":"https://www.example.com/testuser123","followers_url":"https://api.example.com/users/testuser123/followers","following_url":"https://api.example.com/users/testuser123/following{/other_user}","gists_url":"https://api.example.com/users/testuser123/gists{/gist_id}","starred_url":"https://api.example.com/users/testuser123/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/testuser123/subscriptions","organizations_url":"https://api.example.com/users/testuser123/orgs","repos_url":"https://api.example.com/users/testuser123/repos","events_url":"https://api.example.com/users/testuser123/events{/privacy}","received_events_url":"https://api.example.com/users/testuser123/received_events","type":"User","site_admin":false,"starred_at":"2025-05-19T14:30:00Z","user_view_type":"public"},"defaults":{"location":"Sample Region (us-sample-1)","devcontainer_path":".devcontainer/sample-dev-container.json"}};
}

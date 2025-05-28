
import Component from "../components/349";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"MDEyM0dpc3RDb21tZW50LTEwMQ==","url":"https://api.github.com/gists/abcdefgh12345678/comments/101","body":"This is a sample gist comment for UI testing purposes.\nIt includes multiple lines to test rendering in different components.","user":{"name":"Test User (Dev)","email":"test.user@example.com","login":"testuser","id":123456,"node_id":"MDQ6VXNlcjEyMzQ1Ng==","avatar_url":"https://avatars.example.com/u/123456?v=4","gravatar_id":null,"url":"https://api.github.com/users/testuser","html_url":"https://github.com/testuser","followers_url":"https://api.github.com/users/testuser/followers","following_url":"https://api.github.com/users/testuser/following{/other_user}","gists_url":"https://api.github.com/users/testuser/gists{/gist_id}","starred_url":"https://api.github.com/users/testuser/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/testuser/subscriptions","organizations_url":"https://api.github.com/users/testuser/orgs","repos_url":"https://api.github.com/users/testuser/repos","events_url":"https://api.github.com/users/testuser/events{/privacy}","received_events_url":"https://api.github.com/users/testuser/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T13:45:30Z","user_view_type":"public"},"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:00:00Z","author_association":"CONTRIBUTOR"};
}

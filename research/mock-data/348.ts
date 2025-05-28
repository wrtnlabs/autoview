
import Component from "../components/348";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"MDQ6R2lzdENvbW1lbnQxMDE=","url":"https://api.github.com/gists/sample-gist-id/comments/101","body":"This is a sample gist comment body for UI testing purposes. All content herein is fictional and for demonstration only.","user":{"name":"Test User (Dev)","email":"test.user@example.com","login":"testuser-sample","id":1001,"node_id":"MDQ6VXNlcjEwMDE=","avatar_url":"https://avatars.example.com/u/1001?v=4","gravatar_id":"","url":"https://api.github.com/users/testuser-sample","html_url":"https://github.com/testuser-sample","followers_url":"https://api.github.com/users/testuser-sample/followers","following_url":"https://api.github.com/users/testuser-sample/following{/other_user}","gists_url":"https://api.github.com/users/testuser-sample/gists{/gist_id}","starred_url":"https://api.github.com/users/testuser-sample/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/testuser-sample/subscriptions","organizations_url":"https://api.github.com/users/testuser-sample/orgs","repos_url":"https://api.github.com/users/testuser-sample/repos","events_url":"https://api.github.com/users/testuser-sample/events{/privacy}","received_events_url":"https://api.github.com/users/testuser-sample/received_events","type":"User","site_admin":false},"created_at":"2025-05-18T12:34:56Z","updated_at":"2025-05-19T09:15:00Z","author_association":"CONTRIBUTOR"};
}

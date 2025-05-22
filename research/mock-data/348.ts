
import Component from "../components/348";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123456,"node_id":"MDg6R2lzdENvbW1lbnQxMjM0NTY=","url":"https://api.example.com/gists/987654321/comments/123456","body":"This is a sample gist comment for testing UI components. All content is fictional and for demonstration purposes.","user":{"name":"Sample User (Test)","email":"sample.user@example.com","login":"sampleuser","id":1024,"node_id":"MDQ6VXNlcjEwMjQ=","avatar_url":"https://www.example.com/avatar/sampleuser.png","gravatar_id":null,"url":"https://api.example.com/users/sampleuser","html_url":"https://www.example.com/sampleuser","followers_url":"https://api.example.com/users/sampleuser/followers","following_url":"https://api.example.com/users/sampleuser/following{/other_user}","gists_url":"https://api.example.com/users/sampleuser/gists{/gist_id}","starred_url":"https://api.example.com/users/sampleuser/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sampleuser/subscriptions","organizations_url":"https://api.example.com/users/sampleuser/orgs","repos_url":"https://api.example.com/users/sampleuser/repos","events_url":"https://api.example.com/users/sampleuser/events{/privacy}","received_events_url":"https://api.example.com/users/sampleuser/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T09:15:00Z","user_view_type":"FULL"},"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-19T14:30:00Z","author_association":"CONTRIBUTOR"};
}

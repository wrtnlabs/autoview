
import Component from "../components/350";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"MDg6R2lzdENvbW1lbnQxMDE=","url":"https://api.github.com/gists/abcd1234sample/comments/101","body":"This is a sample gist comment for UI testing purposes. All content is fictional and for demonstration only.","user":{"name":"Sample User (Test)","email":"test.user@example.com","login":"sampleUserTest","id":424242,"node_id":"MDQ6VXNlcjQyNDI0Mg==","avatar_url":"https://avatars.example.com/u/424242?v=4","gravatar_id":null,"url":"https://api.github.com/users/sampleUserTest","html_url":"https://github.com/sampleUserTest","followers_url":"https://api.github.com/users/sampleUserTest/followers","following_url":"https://api.github.com/users/sampleUserTest/following{/other_user}","gists_url":"https://api.github.com/users/sampleUserTest/gists{/gist_id}","starred_url":"https://api.github.com/users/sampleUserTest/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/sampleUserTest/subscriptions","organizations_url":"https://api.github.com/users/sampleUserTest/orgs","repos_url":"https://api.github.com/users/sampleUserTest/repos","events_url":"https://api.github.com/users/sampleUserTest/events{/privacy}","received_events_url":"https://api.github.com/users/sampleUserTest/received_events","type":"User","site_admin":false,"starred_at":"2025-05-19T16:00:00Z","user_view_type":"member"},"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:00:00Z","author_association":"MEMBER"};
}

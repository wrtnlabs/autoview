
import Component from "../components/567";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"permission":"write","user":{"name":"Sample User (Test)","email":"test.user@example.com","login":"sample-user-test","id":1024,"node_id":"U_kgDOBsampleNode1234","avatar_url":"https://avatars.example.com/u/1024?v=4","gravatar_id":null,"url":"https://api.example.com/users/sample-user-test","html_url":"https://www.example.com/sample-user-test","followers_url":"https://api.example.com/users/sample-user-test/followers","following_url":"https://api.example.com/users/sample-user-test/following","gists_url":"https://api.example.com/users/sample-user-test/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-user-test/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-user-test/subscriptions","organizations_url":"https://api.example.com/users/sample-user-test/orgs","repos_url":"https://api.example.com/users/sample-user-test/repos","events_url":"https://api.example.com/users/sample-user-test/events{/privacy}","received_events_url":"https://api.example.com/users/sample-user-test/received_events","type":"User","site_admin":false,"starred_at":"2025-05-19T15:30:00Z","user_view_type":"public"}};
}

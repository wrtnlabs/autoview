
import Component from "../components/567";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"permission":"write","user":{"name":"Test User (Sample)","email":"test.user@example.com","login":"test-user-sample","id":1024,"node_id":"NODEID_Sample123=","avatar_url":"https://example.com/avatar/1024.png","gravatar_id":null,"url":"https://api.example.com/users/test-user-sample","html_url":"https://www.example.com/test-user-sample","followers_url":"https://api.example.com/users/test-user-sample/followers","following_url":"https://api.example.com/users/test-user-sample/following{/other_user}","gists_url":"https://api.example.com/users/test-user-sample/gists{/gist_id}","starred_url":"https://api.example.com/users/test-user-sample/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/test-user-sample/subscriptions","organizations_url":"https://api.example.com/users/test-user-sample/orgs","repos_url":"https://api.example.com/users/test-user-sample/repos","events_url":"https://api.example.com/users/test-user-sample/events{/privacy}","received_events_url":"https://api.example.com/users/test-user-sample/received_events","type":"User","site_admin":false,"starred_at":"2025-05-19T15:00:00Z","user_view_type":"public"}};
}


import Component from "../components/857";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345,"node_id":"MDg6UmVhY3Rpb25fMTIzNDU=","user":{"name":"Sample User (Test)","email":"test.user@example.com","login":"sample-user-test","id":101,"node_id":"MDQ6VXNlcjEwMQ==","avatar_url":"https://example.com/avatars/sample-user-test.png","gravatar_id":null,"url":"https://api.example.com/users/sample-user-test","html_url":"https://example.com/sample-user-test","followers_url":"https://api.example.com/users/sample-user-test/followers","following_url":"https://api.example.com/users/sample-user-test/following{/other_user}","gists_url":"https://api.example.com/users/sample-user-test/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-user-test/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-user-test/subscriptions","organizations_url":"https://api.example.com/users/sample-user-test/orgs","repos_url":"https://api.example.com/users/sample-user-test/repos","events_url":"https://api.example.com/users/sample-user-test/events{/privacy}","received_events_url":"https://api.example.com/users/sample-user-test/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T12:00:00Z","user_view_type":"participant"},"content":"hooray","created_at":"2025-05-19T14:30:00Z"};
}

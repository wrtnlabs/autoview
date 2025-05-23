
import Component from "../components/830";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123,"node_id":"MDg6UmVhY3Rpb24xMjM=","user":{"login":"sample-user-test","id":456,"node_id":"MDQ6VXNlcjQ1Ng==","avatar_url":"https://avatars.example.com/users/sample-user-test/avatar.png","gravatar_id":null,"url":"https://api.example.com/users/sample-user-test","html_url":"https://www.example.com/sample-user-test","followers_url":"https://api.example.com/users/sample-user-test/followers","following_url":"https://api.example.com/users/sample-user-test/following{/other_user}","gists_url":"https://api.example.com/users/sample-user-test/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-user-test/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-user-test/subscriptions","organizations_url":"https://api.example.com/users/sample-user-test/orgs","repos_url":"https://api.example.com/users/sample-user-test/repos","events_url":"https://api.example.com/users/sample-user-test/events{/privacy}","received_events_url":"https://api.example.com/users/sample-user-test/received_events","type":"User","site_admin":false,"name":"Test User (Sample)","email":"test.user@example.com","starred_at":"2025-05-18T08:15:30Z","user_view_type":"detailed"},"content":"rocket","created_at":"2025-05-19T14:30:00Z"};
}

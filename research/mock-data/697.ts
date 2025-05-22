
import Component from "../components/697";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"permission":"write","role_name":"Contributor","user":{"login":"sample-user-test","id":1024,"email":"test.user@example.com","name":"Sample User (Test Account)","node_id":"NODEID_sampleUSER_abc123=","avatar_url":"https://www.example.com/avatars/sample-user.png","gravatar_id":null,"url":"https://api.example.com/users/sample-user-test","html_url":"https://www.example.com/sample-user-test","followers_url":"https://api.example.com/users/sample-user-test/followers","following_url":"https://api.example.com/users/sample-user-test/following{/other_user}","gists_url":"https://api.example.com/users/sample-user-test/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-user-test/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-user-test/subscriptions","organizations_url":"https://api.example.com/users/sample-user-test/orgs","repos_url":"https://api.example.com/users/sample-user-test/repos","events_url":"https://api.example.com/users/sample-user-test/events{/privacy}","received_events_url":"https://api.example.com/users/sample-user-test/received_events","type":"User","site_admin":false,"permissions":{"pull":true,"push":false,"admin":false},"role_name":"Contributor","user_view_type":"read-only"}};
}

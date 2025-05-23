
import Component from "../components/697";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"permission":"push","role_name":"Contributor","user":{"login":"test-user-sample","id":6789,"email":"test.user@example.com","name":"Test User (Sample)","node_id":"NODEID_testUser_6789","avatar_url":"https://www.example.com/avatars/6789.png","gravatar_id":null,"url":"https://api.example.com/users/test-user-sample","html_url":"https://www.example.com/test-user-sample","followers_url":"https://api.example.com/users/test-user-sample/followers","following_url":"https://api.example.com/users/test-user-sample/following{/other_user}","gists_url":"https://api.example.com/users/test-user-sample/gists{/gist_id}","starred_url":"https://api.example.com/users/test-user-sample/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/test-user-sample/subscriptions","organizations_url":"https://api.example.com/users/test-user-sample/orgs","repos_url":"https://api.example.com/users/test-user-sample/repos","events_url":"https://api.example.com/users/test-user-sample/events{/privacy}","received_events_url":"https://api.example.com/users/test-user-sample/received_events","type":"User","site_admin":false,"permissions":{"pull":true,"triage":false,"push":true,"maintain":false,"admin":false},"role_name":"Contributor","user_view_type":"detailed"}};
}

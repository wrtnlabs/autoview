
import Component from "../components/697";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"permission":"maintain","role_name":"Maintainer","user":{"login":"test-collaborator-sample","id":12345,"email":"test.collaborator@example.com","name":"Test Collaborator (Sample)","node_id":"NODEID_sample_collab_12345","avatar_url":"https://www.example.com/avatar/test-collaborator-sample.png","gravatar_id":null,"url":"https://api.example.com/users/test-collaborator-sample","html_url":"https://www.example.com/test-collaborator-sample","followers_url":"https://api.example.com/users/test-collaborator-sample/followers","following_url":"https://api.example.com/users/test-collaborator-sample/following{/other_user}","gists_url":"https://api.example.com/users/test-collaborator-sample/gists{/gist_id}","starred_url":"https://api.example.com/users/test-collaborator-sample/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/test-collaborator-sample/subscriptions","organizations_url":"https://api.example.com/users/test-collaborator-sample/orgs","repos_url":"https://api.example.com/users/test-collaborator-sample/repos","events_url":"https://api.example.com/users/test-collaborator-sample/events{/privacy}","received_events_url":"https://api.example.com/users/test-collaborator-sample/received_events","type":"User","site_admin":false,"permissions":{"pull":true,"triage":false,"push":true,"maintain":true,"admin":false},"role_name":"Maintainer","user_view_type":"collaborator"}};
}


import Component from "../components/792";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"NODEID_reaction_abc123XYZ","user":{"name":"Sample User (Test Account)","email":"test.user@example.com","login":"sample-user","id":1001,"node_id":"USER_NODE_ID_sample_ABC123","avatar_url":"https://www.example.com/avatar/sample-user.png","gravatar_id":null,"url":"https://api.example.com/users/sample-user","html_url":"https://github.com/sample-user","followers_url":"https://api.github.com/users/sample-user/followers","following_url":"https://api.github.com/users/sample-user/following{/other_user}","gists_url":"https://api.github.com/users/sample-user/gists{/gist_id}","starred_url":"https://api.github.com/users/sample-user/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/sample-user/subscriptions","organizations_url":"https://api.github.com/users/sample-user/orgs","repos_url":"https://api.github.com/users/sample-user/repos","events_url":"https://api.github.com/users/sample-user/events{/privacy}","received_events_url":"https://api.github.com/users/sample-user/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T09:15:00Z","user_view_type":"member"},"content":"heart","created_at":"2025-05-19T15:22:30Z"};
}

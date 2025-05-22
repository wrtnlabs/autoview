
import Component from "../components/702";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":98765,"node_id":"NODEID_Reaction_abc123XYZ=","user":{"login":"sample-user","id":424242,"node_id":"NODEID_User_abcd1234EFGH=","avatar_url":"https://avatars.example.com/u/424242?v=4","gravatar_id":null,"url":"https://api.example.com/users/sample-user","html_url":"https://www.example.com/sample-user","followers_url":"https://api.example.com/users/sample-user/followers","following_url":"https://api.example.com/users/sample-user/following","gists_url":"https://api.example.com/users/sample-user/gists","starred_url":"https://api.example.com/users/sample-user/starred","subscriptions_url":"https://api.example.com/users/sample-user/subscriptions","organizations_url":"https://api.example.com/users/sample-user/orgs","repos_url":"https://api.example.com/users/sample-user/repos","events_url":"https://api.example.com/users/sample-user/events","received_events_url":"https://api.example.com/users/sample-user/received_events","type":"User","site_admin":false,"name":"Sample User (Test)","email":"test.user@example.com","starred_at":"2025-05-19T15:00:00Z","user_view_type":"member_view"},"content":"hooray","created_at":"2025-05-19T14:30:00Z"};
}

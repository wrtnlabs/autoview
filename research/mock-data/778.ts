
import Component from "../components/778";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"REACTION_NODEID_101","user":{"login":"sample-user","id":501,"node_id":"USER_NODEID_501","avatar_url":"https://avatars.example.com/u/501?v=4","gravatar_id":null,"url":"https://api.example.com/users/sample-user","html_url":"https://www.example.com/sample-user","followers_url":"https://api.example.com/users/sample-user/followers","following_url":"https://api.example.com/users/sample-user/following{/other_user}","gists_url":"https://api.example.com/users/sample-user/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-user/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-user/subscriptions","organizations_url":"https://api.example.com/users/sample-user/orgs","repos_url":"https://api.example.com/users/sample-user/repos","events_url":"https://api.example.com/users/sample-user/events{/privacy}","received_events_url":"https://api.example.com/users/sample-user/received_events","type":"User","site_admin":false,"name":"Test User (Sample)","email":"test.user@example.com","starred_at":"2025-05-19T13:50:00Z","user_view_type":"detailed"},"content":"+1","created_at":"2025-05-19T14:30:00Z"},{"id":102,"node_id":"REACTION_NODEID_102","user":null,"content":"rocket","created_at":"2025-05-19T15:00:00Z"}];
}

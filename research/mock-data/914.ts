
import Component from "../components/914";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"NODEID_SampleReaction_abc123XYZ","user":{"name":"Sample User (Test Account)","email":"sample.user@example.com","login":"sample-user","id":101,"node_id":"NODEID_SampleUser_abcd1234","avatar_url":"https://avatars.example.com/u/101?v=4","gravatar_id":null,"url":"https://api.example.com/users/sample-user","html_url":"https://www.example.com/sample-user","followers_url":"https://api.example.com/users/sample-user/followers","following_url":"https://api.example.com/users/sample-user/following{/other_user}","gists_url":"https://api.example.com/users/sample-user/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-user/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-user/subscriptions","organizations_url":"https://api.example.com/users/sample-user/orgs","repos_url":"https://api.example.com/users/sample-user/repos","events_url":"https://api.example.com/users/sample-user/events{/privacy}","received_events_url":"https://api.example.com/users/sample-user/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T12:34:56Z","user_view_type":"detailed"},"content":"+1","created_at":"2025-05-19T14:30:00Z"},{"id":202,"node_id":"NODEID_SampleReaction2_def456UVW","user":null,"content":"laugh","created_at":"2025-05-19T15:00:00Z"}];
}

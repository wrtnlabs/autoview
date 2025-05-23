
import Component from "../components/492";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"@example-org/ui-components-sample","package_type":"npm","url":"https://api.example.com/packages/ui-components-sample","html_url":"https://www.example.com/ui-components-sample","version_count":5,"visibility":"public","owner":{"name":"Sample User (Test)","email":"test.user@example.com","login":"sampleuser","id":5678,"node_id":"NODEID_SampleUser_abc123","avatar_url":"https://avatars.example.com/sampleuser.png","gravatar_id":null,"url":"https://api.example.com/users/sampleuser","html_url":"https://www.example.com/users/sampleuser","followers_url":"https://api.example.com/users/sampleuser/followers","following_url":"https://api.example.com/users/sampleuser/following{/other_user}","gists_url":"https://api.example.com/users/sampleuser/gists{/gist_id}","starred_url":"https://api.example.com/users/sampleuser/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sampleuser/subscriptions","organizations_url":"https://api.example.com/users/sampleuser/orgs","repos_url":"https://api.example.com/users/sampleuser/repos","events_url":"https://api.example.com/users/sampleuser/events{/privacy}","received_events_url":"https://api.example.com/users/sampleuser/received_events","type":"User","site_admin":false},"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T10:00:00Z"};
}

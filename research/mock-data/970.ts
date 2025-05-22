
import Component from "../components/970";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"@example-org/ui-components-sample","package_type":"npm","url":"https://api.example.com/packages/101","html_url":"https://www.example.com/packages/ui-components-sample","version_count":5,"visibility":"public","owner":{"name":"Sample User (Test)","email":"sample.user@example.com","login":"sampleuser123","id":456,"node_id":"NODEID_simpleuser_abc123","avatar_url":"https://www.example.com/avatars/sampleuser123.png","gravatar_id":null,"url":"https://api.example.com/users/sampleuser123","html_url":"https://www.example.com/sampleuser123","followers_url":"https://api.example.com/users/sampleuser123/followers","following_url":"https://api.example.com/users/sampleuser123/following{/other_user}","gists_url":"https://api.example.com/users/sampleuser123/gists{/gist_id}","starred_url":"https://api.example.com/users/sampleuser123/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sampleuser123/subscriptions","organizations_url":"https://api.example.com/users/sampleuser123/orgs","repos_url":"https://api.example.com/users/sampleuser123/repos","events_url":"https://api.example.com/users/sampleuser123/events{/privacy}","received_events_url":"https://api.example.com/users/sampleuser123/received_events","type":"User","site_admin":false,"starred_at":"2025-05-19T13:00:00Z","user_view_type":"detailed"},"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-19T15:30:00Z"};
}

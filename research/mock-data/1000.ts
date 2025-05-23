
import Component from "../components/1000";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"@example-org/ui-components-sample","package_type":"npm","url":"https://api.example.org/packages/101","html_url":"https://www.example.com/packages/ui-components-sample","version_count":5,"visibility":"public","owner":{"name":"Sample Maintainer (Test)","email":"maintainer@sample-org.example.com","login":"sample-user","id":1001,"node_id":"NODEID_sample_user_ABC123","avatar_url":"https://www.example.com/avatars/sample-user.png","gravatar_id":null,"url":"https://api.example.com/users/sample-user","html_url":"https://www.example.com/users/sample-user","followers_url":"https://api.example.com/users/sample-user/followers","following_url":"https://api.example.com/users/sample-user/following{/other_user}","gists_url":"https://api.example.com/users/sample-user/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-user/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-user/subscriptions","organizations_url":"https://api.example.com/users/sample-user/orgs","repos_url":"https://api.example.com/users/sample-user/repos","events_url":"https://api.example.com/users/sample-user/events{/privacy}","received_events_url":"https://api.example.com/users/sample-user/received_events","type":"User","site_admin":false},"repository":null,"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-06-01T09:15:00Z"};
}

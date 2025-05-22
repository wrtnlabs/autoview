
import Component from "../components/690";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"billable_owner":{"name":"Sample User (Test)","email":"sample.user@example.com","login":"sample-user","id":1024,"node_id":"NODEID_SAMPLE_1024","avatar_url":"https://avatars.example.com/u/1024?test=true","gravatar_id":null,"url":"https://api.example.com/users/sample-user","html_url":"https://www.example.com/sample-user","followers_url":"https://api.example.com/users/sample-user/followers","following_url":"https://api.example.com/users/sample-user/following{/other_user}","gists_url":"https://api.example.com/users/sample-user/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-user/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-user/subscriptions","organizations_url":"https://api.example.com/users/sample-user/orgs","repos_url":"https://api.example.com/users/sample-user/repos","events_url":"https://api.example.com/users/sample-user/events{/privacy}","received_events_url":"https://api.example.com/users/sample-user/received_events","type":"User","site_admin":false,"starred_at":"2025-05-01T12:00:00Z"},"defaults":{"location":"East US","devcontainer_path":".devcontainer/devcontainer.json"}};
}

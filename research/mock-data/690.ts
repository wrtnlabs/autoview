
import Component from "../components/690";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"billable_owner":{"name":"Sample User (Test Account)","email":"sample.user@example.com","login":"sampleuser","id":101,"node_id":"NODEID_SampleUser_abc123==","avatar_url":"https://avatars.example.com/u/101?v=4","gravatar_id":null,"url":"https://api.example.com/users/sampleuser","html_url":"https://www.example.com/sampleuser","followers_url":"https://api.example.com/users/sampleuser/followers","following_url":"https://api.example.com/users/sampleuser/following","gists_url":"https://api.example.com/users/sampleuser/gists","starred_url":"https://api.example.com/users/sampleuser/starred","subscriptions_url":"https://api.example.com/users/sampleuser/subscriptions","organizations_url":"https://api.example.com/users/sampleuser/orgs","repos_url":"https://api.example.com/users/sampleuser/repos","events_url":"https://api.example.com/users/sampleuser/events","received_events_url":"https://api.example.com/users/sampleuser/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T12:34:56Z","user_view_type":"public"},"defaults":{"location":"East US (Sample Region)","devcontainer_path":"/.devcontainer/devcontainer.json"}};
}

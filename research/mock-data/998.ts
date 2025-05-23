
import Component from "../components/998";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"login":"sample-org-1-test","id":101,"node_id":"MDEyOk9yZ2FuaXphdGlvblVuaXQxMDE=","url":"https://api.example.org/orgs/sample-org-1-test","repos_url":"https://api.example.org/orgs/sample-org-1-test/repos","events_url":"https://api.example.org/orgs/sample-org-1-test/events","hooks_url":"https://api.example.org/orgs/sample-org-1-test/hooks","issues_url":"https://api.example.org/orgs/sample-org-1-test/issues","members_url":"https://api.example.org/orgs/sample-org-1-test/members","public_members_url":"https://api.example.org/orgs/sample-org-1-test/public_members","avatar_url":"https://www.example.org/images/sample-org-1-avatar.png","description":"A sample organization for UI testing purposes. All data is fictional."},{"login":"demo-group-sample","id":202,"node_id":"MDEyOk9yZ2FuaXphdGlvckRlbW9Hcm91cDEyMjI=","url":"https://api.example.org/orgs/demo-group-sample","repos_url":"https://api.example.org/orgs/demo-group-sample/repos","events_url":"https://api.example.org/orgs/demo-group-sample/events","hooks_url":"https://api.example.org/orgs/demo-group-sample/hooks","issues_url":"https://api.example.org/orgs/demo-group-sample/issues","members_url":"https://api.example.org/orgs/demo-group-sample/members","public_members_url":"https://api.example.org/orgs/demo-group-sample/public_members","avatar_url":"https://www.example.org/images/demo-group-sample-avatar.png","description":null}];
}

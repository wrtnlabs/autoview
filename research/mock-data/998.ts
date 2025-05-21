
import Component from "../components/998";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"login":"sample-org-test","id":101,"node_id":"MDEyOk9yZ2FuaXphdGlvbjEwMQ==","url":"https://api.github.com/orgs/sample-org-test","repos_url":"https://api.github.com/orgs/sample-org-test/repos","events_url":"https://api.github.com/orgs/sample-org-test/events","hooks_url":"https://api.github.com/orgs/sample-org-test/hooks","issues_url":"https://api.github.com/orgs/sample-org-test/issues","members_url":"https://api.github.com/orgs/sample-org-test/members","public_members_url":"https://api.github.com/orgs/sample-org-test/public_members","avatar_url":"https://avatars.example.com/u/101?v=4","description":"Sample organization for UI testing (Test Data)"},{"login":"another-org-sample","id":202,"node_id":"MDg6T3JnYW5pemF0aW9uMjAy","url":"https://api.github.com/orgs/another-org-sample","repos_url":"https://api.github.com/orgs/another-org-sample/repos","events_url":"https://api.github.com/orgs/another-org-sample/events","hooks_url":"https://api.github.com/orgs/another-org-sample/hooks","issues_url":"https://api.github.com/orgs/another-org-sample/issues","members_url":"https://api.github.com/orgs/another-org-sample/members","public_members_url":"https://api.github.com/orgs/another-org-sample/public_members","avatar_url":"https://avatars.example.com/u/202?v=4","description":null}];
}

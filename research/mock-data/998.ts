
import Component from "../components/998";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"login":"sample-org-test","id":101,"node_id":"MDEyOk9yZ2FuaXphdGlvbjEyMzQ1Ng==","url":"https://api.github.com/orgs/sample-org-test","repos_url":"https://api.github.com/orgs/sample-org-test/repos","events_url":"https://api.github.com/orgs/sample-org-test/events","hooks_url":"https://api.github.com/orgs/sample-org-test/hooks","issues_url":"https://api.github.com/orgs/sample-org-test/issues","members_url":"https://api.github.com/orgs/sample-org-test/members","public_members_url":"https://api.github.com/orgs/sample-org-test/public_members","avatar_url":"https://avatars.githubusercontent.com/u/101?v=4","description":"Sample Organization for UI testing purposes. All data is fictional and for demonstration only."},{"login":"example-org-dev","id":102,"node_id":"MDEyOk9yZ2FuaXphdGlvbjU2Nzg5MA==","url":"https://api.github.com/orgs/example-org-dev","repos_url":"https://api.github.com/orgs/example-org-dev/repos","events_url":"https://api.github.com/orgs/example-org-dev/events","hooks_url":"https://api.github.com/orgs/example-org-dev/hooks","issues_url":"https://api.github.com/orgs/example-org-dev/issues","members_url":"https://api.github.com/orgs/example-org-dev/members","public_members_url":"https://api.github.com/orgs/example-org-dev/public_members","avatar_url":"https://avatars.githubusercontent.com/u/102?v=4","description":null}];
}

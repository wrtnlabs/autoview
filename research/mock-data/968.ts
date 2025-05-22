
import Component from "../components/968";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"login":"sample-org","id":12345678,"node_id":"MDEyOk9yZ2FnaXphdGlvbjEyMzQ1Ng==","url":"https://api.github.com/orgs/sample-org","repos_url":"https://api.github.com/orgs/sample-org/repos","events_url":"https://api.github.com/orgs/sample-org/events","hooks_url":"https://api.github.com/orgs/sample-org/hooks","issues_url":"https://api.github.com/orgs/sample-org/issues","members_url":"https://api.github.com/orgs/sample-org/members","public_members_url":"https://api.github.com/orgs/sample-org/public_members","avatar_url":"https://avatars.githubusercontent.com/u/12345678?v=4","description":"A sample organization for UI testing. This description is fictional and used for demonstration purposes (Test Data)."},{"login":"test-organization","id":87654321,"node_id":"MDEyOk9yZ2FnaXphdGlvbjc4NjU0MzIx","url":"https://api.github.com/orgs/test-organization","repos_url":"https://api.github.com/orgs/test-organization/repos","events_url":"https://api.github.com/orgs/test-organization/events","hooks_url":"https://api.github.com/orgs/test-organization/hooks","issues_url":"https://api.github.com/orgs/test-organization/issues","members_url":"https://api.github.com/orgs/test-organization/members","public_members_url":"https://api.github.com/orgs/test-organization/public_members","avatar_url":"https://avatars.githubusercontent.com/u/87654321?v=4","description":null}];
}

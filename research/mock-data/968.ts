
import Component from "../components/968";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"login":"sample-org-test","id":12345,"node_id":"ORG_NODE_ID_AbCdEf123=","url":"https://api.example.com/orgs/sample-org-test","repos_url":"https://api.example.com/orgs/sample-org-test/repos","events_url":"https://api.example.com/orgs/sample-org-test/events","hooks_url":"https://api.example.com/orgs/sample-org-test/hooks","issues_url":"https://api.example.com/orgs/sample-org-test/issues","members_url":"https://api.example.com/orgs/sample-org-test/members{/member}","public_members_url":"https://api.example.com/orgs/sample-org-test/public_members{/member}","avatar_url":"https://www.example.com/avatars/sample-org-test.png","description":"A sample organization for UI testing purposes. All data here is fictional."},{"login":"dummy-org","id":67890,"node_id":"ORG_NODE_ID_ZyXwVu987=","url":"https://api.example.com/orgs/dummy-org","repos_url":"https://api.example.com/orgs/dummy-org/repos","events_url":"https://api.example.com/orgs/dummy-org/events","hooks_url":"https://api.example.com/orgs/dummy-org/hooks","issues_url":"https://api.example.com/orgs/dummy-org/issues","members_url":"https://api.example.com/orgs/dummy-org/members{/member}","public_members_url":"https://api.example.com/orgs/dummy-org/public_members{/member}","avatar_url":"https://www.example.com/avatars/dummy-org.png","description":null}];
}

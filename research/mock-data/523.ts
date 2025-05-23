
import Component from "../components/523";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDQ6VGVhbDEwMQ==","url":"https://api.example.com/teams/101","members_url":"https://api.example.com/teams/101/members","name":"Sample Team (Test)","description":"This is a sample description for a team used in UI testing purposes. All data is fictional.","permission":"admin","privacy":"closed","notification_setting":"notifications_enabled","html_url":"https://www.example.com/orgs/sample-org/teams/sample-team","repositories_url":"https://api.example.com/orgs/sample-org/teams/sample-team/repos","slug":"sample-team","ldap_dn":"cn=Sample Team,ou=Groups,dc=example,dc=com"},{"id":202,"node_id":"MDQ6VGVhbDIwMg==","url":"https://api.example.com/teams/202","members_url":"https://api.example.com/teams/202/members","name":"Developers (Test Group)","description":null,"permission":"pull","html_url":"https://www.example.com/orgs/sample-org/teams/developers-test-group","repositories_url":"https://api.example.com/orgs/sample-org/teams/developers-test-group/repos","slug":"developers-test-group"}];
}


import Component from "../components/523";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"TESTNODEID_TeamSimple_ABC123=","url":"https://api.example.com/orgs/sample-org/teams/sample-team","members_url":"https://api.example.com/orgs/sample-org/teams/sample-team/members{/member}","name":"Sample Team A (Test)","description":"This is a sample team for testing UI components. All data is fictional.","permission":"push","privacy":"closed","notification_setting":"default","html_url":"https://www.example.com/orgs/sample-org/teams/sample-team","repositories_url":"https://api.example.com/orgs/sample-org/teams/sample-team/repos","slug":"sample-team","ldap_dn":"cn=sample-team,ou=groups,dc=example,dc=com"},{"id":102,"node_id":"TESTNODEID_TeamSimple_DEF456=","url":"https://api.example.com/orgs/demo-org/teams/demo-team","members_url":"https://api.example.com/orgs/demo-org/teams/demo-team/members{/member}","name":"Demo Team B (Sample)","description":null,"permission":"pull","html_url":"https://www.example.com/orgs/demo-org/teams/demo-team","repositories_url":"https://api.example.com/orgs/demo-org/teams/demo-team/repos","slug":"demo-team"}];
}

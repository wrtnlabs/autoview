
import Component from "../components/523";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"TEAM_NODEID_abc123=","url":"https://api.example.com/teams/101","members_url":"https://api.example.com/teams/101/members","name":"Dev Team (Test)","description":"A sample team for testing UI components.","permission":"admin","privacy":"closed","notification_setting":"always","html_url":"https://example.com/orgs/sample-org/teams/dev-team","repositories_url":"https://api.example.com/orgs/sample-org/teams/dev-team/repos","slug":"dev-team","ldap_dn":"cn=dev-team,dc=example,dc=com"},{"id":102,"node_id":"TEAM_NODEID_def456=","url":"https://api.example.com/teams/102","members_url":"https://api.example.com/teams/102/members","name":"QA Team (Sample)","description":null,"permission":"push","html_url":"https://example.com/orgs/sample-org/teams/qa-team","repositories_url":"https://api.example.com/orgs/sample-org/teams/qa-team/repos","slug":"qa-team"}];
}

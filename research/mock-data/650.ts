
import Component from "../components/650";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDQ6VGVhbTEwMQ==","name":"Sample Team Alpha (Test)","slug":"sample-team-alpha","description":"This is a sample team for UI testing purposes.","privacy":"closed","notification_setting":"notifications_enabled","permission":"push","permissions":{"pull":true,"triage":false,"push":true,"maintain":false,"admin":false},"url":"https://api.example.org/teams/101","html_url":"https://www.example.com/teams/101","members_url":"https://api.example.org/teams/101/members{/member}","repositories_url":"https://api.example.org/teams/101/repos","parent":{"id":10,"node_id":"MDQ6VGVhbTEwMA==","url":"https://api.example.org/teams/10","members_url":"https://api.example.org/teams/10/members{/member}","name":"Parent Team (Test)","description":null,"permission":"admin","privacy":"closed","notification_setting":"notifications_enabled","html_url":"https://www.example.com/teams/10","repositories_url":"https://api.example.org/teams/10/repos","slug":"parent-team","ldap_dn":"cn=Parent Team,ou=Teams,dc=example,dc=com"}},{"id":202,"node_id":"MDQ6VGVhbDIwMg==","name":"Sample Team Beta (Test)","slug":"sample-team-beta","description":null,"permission":"pull","url":"https://api.example.org/teams/202","html_url":"https://www.example.com/teams/202","members_url":"https://api.example.org/teams/202/members{/member}","repositories_url":"https://api.example.org/teams/202/repos","parent":null}];
}

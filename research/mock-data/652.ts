
import Component from "../components/652";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDQ6VGVhbTEwMQ==","name":"Dev Infrastructure Team (Test)","slug":"dev-infra-team-test","description":"This team manages the development infrastructure for testing environments.","privacy":"secret","notification_setting":"all","permission":"push","permissions":{"pull":true,"triage":false,"push":true,"maintain":false,"admin":false},"url":"https://api.example.com/teams/101","html_url":"https://www.example.com/teams/101","members_url":"https://api.example.com/teams/101/members{/member}","repositories_url":"https://api.example.com/teams/101/repos","parent":{"id":10,"node_id":"MDQ6VGVhbDEw","url":"https://api.example.com/teams/10","members_url":"https://api.example.com/teams/10/members{/member}","name":"Engineering (Sample Team)","description":null,"permission":"pull","privacy":"closed","notification_setting":"detailed","html_url":"https://www.example.com/teams/10","repositories_url":"https://api.example.com/teams/10/repos","slug":"engineering-sample","ldap_dn":"cn=engineering,ou=groups,dc=example,dc=com"}},{"id":202,"node_id":"MDQ6VGVhbDIwMg==","name":"Product Management Team (Test)","slug":"product-management-team-test","description":null,"permission":"admin","url":"https://api.example.com/teams/202","html_url":"https://www.example.com/teams/202","members_url":"https://api.example.com/teams/202/members{/member}","repositories_url":"https://api.example.com/teams/202/repos","parent":null}];
}

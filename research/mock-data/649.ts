
import Component from "../components/649";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"TGVhZGVyVGVhbTEwMQ==","name":"Development Team (Test)","slug":"development-team-test","description":"Team responsible for development on sample project (Test)","privacy":"closed","notification_setting":"notifications_enabled","permission":"push","permissions":{"pull":true,"triage":false,"push":true,"maintain":false,"admin":false},"url":"https://api.example.com/teams/101","html_url":"https://www.example.com/teams/101","members_url":"https://api.example.com/teams/101/members{/member}","repositories_url":"https://api.example.com/teams/101/repos","parent":null},{"id":102,"node_id":"TGVhZGVyVGVhbTkwMg==","name":"QA Team (Sample)","slug":"qa-team-sample","description":null,"permission":"triage","url":"https://api.example.com/teams/102","html_url":"https://www.example.com/teams/102","members_url":"https://api.example.com/teams/102/members{/member}","repositories_url":"https://api.example.com/teams/102/repos","parent":{"id":100,"node_id":"TGVhZGVyU2ltcGxlMTAwMQ==","url":"https://api.example.com/teams/100","members_url":"https://api.example.com/teams/100/members{/member}","name":"Sample Parent Team","description":"Parent Team for QA (Test)","permission":"pull","privacy":"closed","notification_setting":"notifications_disabled","html_url":"https://www.example.com/teams/100","repositories_url":"https://api.example.com/teams/100/repos","slug":"parent-team-test","ldap_dn":"cn=parent_team,dc=example,dc=com"}}];
}

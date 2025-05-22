
import Component from "../components/606";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"environment":{"id":42,"node_id":"NODEID_testEnv_123ABC","name":"Staging (Test)","url":"https://api.example.com/environments/42","html_url":"https://www.example.com/environments/42"},"wait_timer":600,"wait_timer_started_at":"2025-05-19T10:00:00Z","current_user_can_approve":true,"reviewers":[{"type":"User","reviewer":{"login":"test-user-sample","id":1001,"type":"User"}},{"type":"Team","reviewer":{"name":"sample-team","id":2002,"slug":"sample-team","url":"https://api.github.com/orgs/example-org/teams/sample-team"}}]},{"environment":{"id":99,"node_id":"NODEID_prodEnv_789XYZ","name":"Production (Dummy)"},"wait_timer":120,"wait_timer_started_at":null,"current_user_can_approve":false,"reviewers":[]}];
}

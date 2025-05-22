
import Component from "../components/514";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample Ruleset (Test)","target":"branch","source_type":"Repository","source":"example-org/sample-repo","enforcement":"active","bypass_actors":[{"actor_id":555,"actor_type":"Integration","bypass_mode":"always"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"pull_requests_only","node_id":"MDE6UmVwb3NpdG9yeVJ1bGVzZXQgNDI=","_links":{"self":{"href":"https://api.github.com/repos/example-org/sample-repo/rulesets/42"},"html":{"href":"https://github.com/example-org/sample-repo/settings/rulesets/42"}},"conditions":{"branch_name_pattern":"release/*"},"rules":[{"id":101,"type":"required_status_checks","parameters":{"contexts":["ci/test","ci/lint"],"strict":true}}],"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-20T08:30:00Z"};
}

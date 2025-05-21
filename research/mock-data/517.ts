
import Component from "../components/517";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample Ruleset (Test)","target":"branch","source_type":"Repository","source":"example-org/sample-repo","enforcement":"active","bypass_actors":[{"actor_id":101,"actor_type":"Team","bypass_mode":"pull_request"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"pull_requests_only","node_id":"NODEID_SampleRuleset_01abc","_links":{"self":{"href":"https://api.example.com/repos/example-org/sample-repo/rulesets/42"},"html":{"href":"https://www.example.com/example-org/sample-repo/rulesets/42"}},"conditions":{"branches":["main","dev"]},"rules":[{"type":"required_status_checks","settings":{"strict":true,"contexts":["ci-build","lint-check"]}},{"type":"branch_name_pattern","pattern":"release/*"}],"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-19T13:30:00Z"};
}

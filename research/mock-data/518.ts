
import Component from "../components/518";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample Ruleset (Test)","target":"branch","source_type":"Organization","source":"example-org/sample-repo","enforcement":"evaluate","bypass_actors":[{"actor_id":1001,"actor_type":"Team","bypass_mode":"pull_request"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"never","node_id":"NODEID_SampleRuleset_42=","_links":{"self":{"href":"https://api.example.com/rulesets/42"},"html":{"href":"https://www.example.com/rulesets/42"}},"conditions":{"pattern":"release/*","enabled":true},"rules":[{"type":"required_status_checks","settings":{"contexts":["ci/circleci","ci/travis-ci"],"strict":true}},{"type":"branch_name_pattern","settings":{"pattern":"feature/*"}}],"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T10:15:00Z"};
}

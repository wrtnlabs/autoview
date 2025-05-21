
import Component from "../components/863";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Ruleset (Test)","target":"branch","source_type":"Organization","source":"example-org","enforcement":"active","bypass_actors":[{"actor_id":42,"actor_type":"Integration","bypass_mode":"always"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"pull_requests_only","node_id":"NODEID_SampleRuleset_101","_links":{"self":{"href":"https://api.example.com/orgs/example-org/rulesets/101"},"html":{"href":"https://www.example.com/example-org/rulesets/101"}},"conditions":{"pattern":"feature/*","exclude_branches":["hotfix/*"]},"rules":[{"id":1,"type":"required_status_checks","required_status_checks":["ci/test","ci/lint"]},{"id":2,"type":"branch_name_pattern","pattern":"release/*"}],"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-19T12:30:00Z"};
}

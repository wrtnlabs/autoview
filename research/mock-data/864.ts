
import Component from "../components/864";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Ruleset (Test)","target":"branch","source_type":"Repository","source":"sample-repo","enforcement":"active","bypass_actors":[{"actor_id":2001,"actor_type":"Integration","bypass_mode":"pull_request"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"never","node_id":"NODEID_SampleRuleset_ABC123=","_links":{"self":{"href":"https://api.example.com/repos/example-org/sample-repo/rulesets/101"},"html":{"href":"https://www.example.com/repos/example-org/sample-repo/settings/rulesets/101"}},"conditions":{"pattern":"feature/*","branch_protection":true},"rules":[{"type":"branch_name_pattern","pattern":"feature/*","enforce":true},{"type":"required_status_checks","contexts":["ci/sample-build","ci/sample-test"],"strict":false}],"created_at":"2025-05-19T10:00:00Z","updated_at":"2025-05-19T12:30:00Z"};
}

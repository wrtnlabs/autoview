
import Component from "../components/513";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"Sample Branch Protection Ruleset (Test)","target":"branch","source_type":"Repository","source":"sample-repo","enforcement":"active","bypass_actors":[{"actor_id":501,"actor_type":"Integration","bypass_mode":"always"},{"actor_id":1001,"actor_type":"RepositoryRole","bypass_mode":"pull_request"}],"current_user_can_bypass":"pull_requests_only","node_id":"NODEID_SampleRuleset_56789","_links":{"self":{"href":"https://api.example.com/repos/example-org/sample-repo/rulesets/101"},"html":{"href":"https://www.example.com/repos/example-org/sample-repo/rulesets/101"}},"conditions":{"pattern":"feature/*"},"rules":[{"rule_type":"required_status_checks","preferences":{"strict":true,"contexts":["ci/sample-test"]}}],"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z"},{"id":202,"name":"Sample Tag Protection Ruleset (Demo)","target":"tag","source_type":"Organization","source":"sample-org","enforcement":"evaluate","bypass_actors":[{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"never","node_id":"NODEID_SampleRuleset_98765","_links":{"self":{"href":"https://api.example.com/orgs/sample-org/rulesets/202"},"html":null},"conditions":null,"rules":[],"created_at":"2025-05-18T08:00:00Z"}];
}

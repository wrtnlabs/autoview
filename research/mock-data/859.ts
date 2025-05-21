
import Component from "../components/859";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":42,"name":"Main Branch Protection (Test)","target":"branch","source_type":"Repository","source":"example-org/sample-repo","enforcement":"active","bypass_actors":[{"actor_id":5002,"actor_type":"Integration","bypass_mode":"pull_request"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"pull_requests_only","node_id":"NODEID_repo_ruleset_42_Sample=","_links":{"self":{"href":"https://api.example.com/repos/example-org/sample-repo/rulesets/42"},"html":{"href":"https://www.example.com/repos/example-org/sample-repo/rulesets/42"}},"conditions":{"pattern":"release/*"},"rules":[{"type":"require_status_checks","settings":{"strict":true,"contexts":["ci/test-sample"]}}],"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-20T08:30:00Z"},{"id":101,"name":"Tag Push Policy (Sample)","target":"tag","source":"example-org/sample-repo","enforcement":"evaluate","_links":{"self":{"href":"https://api.example.com/repos/example-org/sample-repo/rulesets/101"},"html":null},"conditions":null,"rules":[],"created_at":"2025-05-18T09:15:00Z","updated_at":"2025-05-18T09:15:00Z"}];
}

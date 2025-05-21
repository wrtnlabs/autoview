
import Component from "../components/860";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123,"name":"Sample Repository Ruleset (Test)","target":"branch","source_type":"Repository","source":"example-org/sample-repo (Test)","enforcement":"active","bypass_actors":[{"actor_id":101,"actor_type":"Team","bypass_mode":"pull_request"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"pull_requests_only","node_id":"MDEyOk9yZ2FsaXRlUm9sZVNldF9uZGVJZA==","_links":{"self":{"href":"https://api.example.com/repos/example-org/sample-repo/rulesets/123"},"html":{"href":"https://www.example.com/repos/example-org/sample-repo/rulesets/123"}},"conditions":{"dummy_conditions":"This is a placeholder for actual conditions."},"rules":[{"type":"required_approvals","parameters":{"minimum_approvals":2,"dismiss_stale_reviews":true}},{"type":"commit_message_pattern","parameters":{"pattern":"^feat\\:.*","negate":false}}],"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z"};
}


import Component from "../components/860";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample Repository Ruleset","target":"branch","source_type":"Repository","source":"sample-repo","enforcement":"active","bypass_actors":[{"actor_id":1,"actor_type":"OrganizationAdmin","bypass_mode":"pull_request"}],"current_user_can_bypass":"pull_requests_only","node_id":"NODEID_SampleRuleset_42abc=","_links":{"self":{"href":"https://api.example.com/repos/example-org/sample-repo/rulesets/42"},"html":{"href":"https://www.example.com/example-org/sample-repo/rulesets/42"}},"conditions":{"ref_name":{"include":["main","release-*"],"exclude":["hotfix/*"]}},"rules":[{"type":"creation"},{"type":"merge_queue","parameters":{"check_response_timeout_minutes":15,"grouping_strategy":"HEADGREEN","max_entries_to_build":5,"max_entries_to_merge":3,"merge_method":"SQUASH","min_entries_to_merge":1,"min_entries_to_merge_wait_minutes":10}},{"type":"required_status_checks","parameters":{"do_not_enforce_on_create":false,"required_status_checks":[{"context":"ci/test-suite","integration_id":101},{"context":"coverage/report"}],"strict_required_status_checks_policy":true}}],"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-19T13:00:00Z"};
}

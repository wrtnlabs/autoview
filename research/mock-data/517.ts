
import Component from "../components/517";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample Ruleset (Test)","target":"branch","source_type":"Repository","source":"example-org","enforcement":"active","bypass_actors":[{"actor_id":1001,"actor_type":"Team","bypass_mode":"pull_request"}],"current_user_can_bypass":"never","node_id":"NODEID_Sample_abc123","_links":{"self":{"href":"https://api.github.com/repos/example-org/sample-repo/rulesets/42"},"html":{"href":"https://github.com/example-org/sample-repo/settings/rulesets/42"}},"conditions":{"ref_name":{"include":["main","release/*"],"exclude":["hotfix/*"]}},"rules":[{"type":"creation"},{"type":"pull_request","parameters":{"allowed_merge_methods":["merge","squash"],"automatic_copilot_code_review_enabled":true,"dismiss_stale_reviews_on_push":true,"require_code_owner_review":false,"require_last_push_approval":true,"required_approving_review_count":2,"required_review_thread_resolution":true}},{"type":"non_fast_forward"},{"type":"required_status_checks","parameters":{"do_not_enforce_on_create":false,"required_status_checks":[{"context":"ci/sample-build","integration_id":123}],"strict_required_status_checks_policy":true}}],"created_at":"2025-05-19T08:00:00Z","updated_at":"2025-05-20T12:30:45Z"};
}

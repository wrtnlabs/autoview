
import Component from "../components/859";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"Sample Ruleset (Test)","target":"branch","source_type":"Organization","source":"sample-org/sample-repo","enforcement":"active","bypass_actors":[{"actor_id":1001,"actor_type":"Integration","bypass_mode":"always"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"pull_requests_only","node_id":"NODEID_ruleset_ABC123test","_links":{"self":{"href":"https://api.example.com/repos/sample-org/sample-repo/rulesets/101"},"html":{"href":"https://www.example.com/sample-org/sample-repo/rulesets/101"}},"conditions":{"ref_name":{"include":["~DEFAULT_BRANCH","release-*"],"exclude":["bugfix/*"]}},"rules":[{"type":"creation"},{"type":"pull_request","parameters":{"allowed_merge_methods":["merge","rebase"],"automatic_copilot_code_review_enabled":true,"dismiss_stale_reviews_on_push":false,"require_code_owner_review":true,"require_last_push_approval":false,"required_approving_review_count":2,"required_review_thread_resolution":true}},{"type":"required_status_checks","parameters":{"do_not_enforce_on_create":false,"required_status_checks":[{"context":"ci/build (Sample)","integration_id":42},{"context":"coverage/test (Sample)"}],"strict_required_status_checks_policy":true}}],"created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T12:30:00Z"}];
}

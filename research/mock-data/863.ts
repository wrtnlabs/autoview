
import Component from "../components/863";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample Repository Ruleset (Test)","target":"branch","source_type":"Repository","source":"example-org/sample-repo","enforcement":"active","bypass_actors":[{"actor_id":1001,"actor_type":"Integration","bypass_mode":"always"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"pull_requests_only","node_id":"MDExOlJlcG9zaXRvcnlSbGVzZXRzZXQ=","_links":{"self":{"href":"https://api.example.com/repos/example-org/sample-repo/rulesets/42"},"html":{"href":"https://www.example.com/repos/example-org/sample-repo/rulesets/42"}},"conditions":{"ref_name":{"include":["main","release/*"],"exclude":["dependabot/*"]}},"rules":[{"type":"creation"},{"type":"pull_request","parameters":{"allowed_merge_methods":["merge","squash"],"automatic_copilot_code_review_enabled":true,"dismiss_stale_reviews_on_push":true,"require_code_owner_review":false,"require_last_push_approval":true,"required_approving_review_count":2,"required_review_thread_resolution":true}},{"type":"required_status_checks","parameters":{"do_not_enforce_on_create":false,"required_status_checks":[{"context":"ci/test-suite","integration_id":1234},{"context":"security/scan"}],"strict_required_status_checks_policy":true}}],"created_at":"2025-05-19T09:15:00Z","updated_at":"2025-05-20T11:30:00Z"};
}


import Component from "../components/514";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345,"name":"Sample Repository Ruleset (Test)","target":"branch","source_type":"Repository","source":"example-repo","enforcement":"active","bypass_actors":[{"actor_id":1,"actor_type":"OrganizationAdmin","bypass_mode":"always"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"pull_requests_only","node_id":"NODEID_SampleRuleSet_0001","_links":{"self":{"href":"https://api.example.com/rulesets/12345"},"html":{"href":"https://www.example.com/repo/rulesets/12345"}},"conditions":{"ref_name":{"include":["main","develop","~DEFAULT_BRANCH"],"exclude":["hotfix/*"]}},"rules":[{"type":"creation"},{"type":"pull_request","parameters":{"allowed_merge_methods":["merge","squash"],"automatic_copilot_code_review_enabled":true,"dismiss_stale_reviews_on_push":true,"require_code_owner_review":false,"require_last_push_approval":true,"required_approving_review_count":2,"required_review_thread_resolution":true}},{"type":"required_status_checks","parameters":{"do_not_enforce_on_create":true,"required_status_checks":[{"context":"ci/test-suite","integration_id":501},{"context":"build/lint"}],"strict_required_status_checks_policy":true}}],"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z"};
}

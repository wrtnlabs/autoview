
import Component from "../components/517";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Ruleset (Test)","target":"branch","source_type":"Repository","source":"sample-repo","enforcement":"active","bypass_actors":[{"actor_id":1,"actor_type":"OrganizationAdmin","bypass_mode":"always"},{"actor_id":3001,"actor_type":"Team","bypass_mode":"pull_request"}],"current_user_can_bypass":"never","node_id":"NODEID_SampleRuleset_ABC123==","_links":{"self":{"href":"https://api.example.com/repos/example-org/sample-repo/rulesets/101"},"html":{"href":"https://www.example.com/repos/example-org/sample-repo/settings/rulesets/101"}},"conditions":{"ref_name":{"include":["main","release/*"],"exclude":["hotfix/*"]}},"rules":[{"type":"creation"},{"type":"pull_request","parameters":{"allowed_merge_methods":["squash","rebase"],"automatic_copilot_code_review_enabled":false,"dismiss_stale_reviews_on_push":true,"require_code_owner_review":false,"require_last_push_approval":true,"required_approving_review_count":2,"required_review_thread_resolution":true}},{"type":"required_status_checks","parameters":{"do_not_enforce_on_create":false,"strict_required_status_checks_policy":true,"required_status_checks":[{"context":"ci/test-suite","integration_id":45},{"context":"security/scan"}]}}],"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T10:15:00Z"};
}

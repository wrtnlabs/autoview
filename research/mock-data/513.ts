
import Component from "../components/513";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"Sample Ruleset (Test)","target":"branch","source_type":"Repository","source":"example/repo-sample","enforcement":"evaluate","bypass_actors":[{"actor_id":999,"actor_type":"Team","bypass_mode":"pull_request"}],"current_user_can_bypass":"pull_requests_only","node_id":"NODEID_Ruleset_abc123XYZ=","_links":{"self":{"href":"https://api.example.com/repos/example/repo-sample/rulesets/101"},"html":{"href":"https://www.example.com/repos/example/repo-sample/settings/rulesets/101"}},"conditions":{"ref_name":{"include":["main","release/*"],"exclude":["hotfix/*"]}},"rules":[{"type":"creation"},{"type":"update","parameters":{"update_allows_fetch_and_merge":true}},{"type":"pull_request","parameters":{"allowed_merge_methods":["merge","squash","rebase"],"automatic_copilot_code_review_enabled":false,"dismiss_stale_reviews_on_push":true,"require_code_owner_review":true,"require_last_push_approval":false,"required_approving_review_count":2,"required_review_thread_resolution":true}},{"type":"required_status_checks","parameters":{"do_not_enforce_on_create":false,"required_status_checks":[{"context":"ci/test","integration_id":123},{"context":"security/scan"}],"strict_required_status_checks_policy":true}}],"created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T12:30:00Z"}];
}

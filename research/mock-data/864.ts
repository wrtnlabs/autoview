
import Component from "../components/864";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345,"name":"Sample Ruleset for UI Testing","target":"branch","source_type":"Repository","source":"example-repo","enforcement":"active","bypass_actors":[{"actor_id":1001,"actor_type":"Integration","bypass_mode":"pull_request"},{"actor_id":null,"actor_type":"DeployKey"}],"current_user_can_bypass":"pull_requests_only","node_id":"MDExOlJ1bGVzZXQxMjM0NQ==","_links":{"self":{"href":"https://api.example.com/repos/example-org/example-repo/rulesets/12345"},"html":{"href":"https://www.example.com/repos/example-org/example-repo/rulesets/12345.html"}},"conditions":{"ref_name":{"include":["main-test","release/*"],"exclude":["hotfix/*"]}},"rules":[{"type":"creation"},{"type":"update","parameters":{"update_allows_fetch_and_merge":true}},{"type":"required_status_checks","parameters":{"do_not_enforce_on_create":false,"required_status_checks":[{"context":"ci/sample-build","integration_id":200}],"strict_required_status_checks_policy":true}},{"type":"commit_message_pattern","parameters":{"name":"Require Ticket Reference","operator":"regex","pattern":"^ISSUE-[0-9]+","negate":false}},{"type":"file_extension_restriction","parameters":{"restricted_file_extensions":[".exe",".dll"]}},{"type":"max_file_size","parameters":{"max_file_size":10}}],"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z"};
}

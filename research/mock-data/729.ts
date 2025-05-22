
import Component from "../components/729";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"environments":[{"id":101,"node_id":"ENV_NODEID_abc123XYZ=","name":"staging","url":"https://api.example.com/repos/example-org/sample-repo/environments/staging","html_url":"https://www.example.com/repos/example-org/sample-repo/environments/staging","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T12:30:00Z","protection_rules":[{"id":201,"node_id":"PR_NODEID_wait_01","type":"wait_timer_rule","wait_timer":3600},{"id":202,"node_id":"PR_NODEID_no_self_review","type":"self_review_rule","prevent_self_review":true,"reviewers":[{"type":"User","reviewer":{"login":"test-reviewer-sample","id":1001}}]},{"id":203,"node_id":"PR_NODEID_basic","type":"basic_rule"}],"deployment_branch_policy":{"protected_branches":true,"custom_branch_policies":false}},{"id":102,"node_id":"ENV_NODEID_xyz789ABC=","name":"production","url":"https://api.example.com/repos/example-org/sample-repo/environments/production","html_url":"https://www.example.com/repos/example-org/sample-repo/environments/production","created_at":"2025-01-15T08:00:00Z","updated_at":"2025-05-18T17:45:00Z","deployment_branch_policy":null}]};
}

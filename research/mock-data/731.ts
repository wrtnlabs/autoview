
import Component from "../components/731";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"NODEID_env_101","name":"Production Environment (Test)","url":"https://api.example.com/v1/environments/101","html_url":"https://www.example.com/environments/101/details","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T12:00:00Z","protection_rules":[{"id":201,"node_id":"NODEID_pr_201","type":"wait_timer","wait_timer":3600},{"id":202,"node_id":"NODEID_pr_202","type":"enforce_reviewers","prevent_self_review":true,"reviewers":[{"type":"USER","reviewer":{"login":"test-reviewer-dev","id":1001}},{"type":"TEAM","reviewer":{"name":"Sample Team (Test)","id":202}}]},{"id":203,"node_id":"NODEID_pr_203","type":"standard"}],"deployment_branch_policy":{"protected_branches":true,"custom_branch_policies":false}};
}

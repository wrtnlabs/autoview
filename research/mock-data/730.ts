
import Component from "../components/730";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"ENVNODEID_sample123=","name":"Staging Environment (Test)","url":"https://api.example.com/environments/42","html_url":"https://www.example.com/environments/42","created_at":"2025-05-19T09:15:00Z","updated_at":"2025-05-19T10:00:00Z","protection_rules":[{"id":101,"node_id":"NODEID_prule_101=","type":"wait_timer","wait_timer":3600},{"id":102,"node_id":"NODEID_prule_102=","type":"required_approvals","prevent_self_review":true,"reviewers":[{"type":"User","reviewer":{"login":"sample-reviewer","id":1001}}]},{"id":103,"node_id":"NODEID_prule_103=","type":"simple_rule"}],"deployment_branch_policy":{"protected_branches":true,"custom_branch_policies":false}};
}

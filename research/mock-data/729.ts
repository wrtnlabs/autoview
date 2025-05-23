
import Component from "../components/729";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"environments":[{"id":101,"node_id":"ENVNODE1_abc123=","name":"Staging (Sample)","url":"https://api.example.com/repos/example-org/sample-repo/environments/101","html_url":"https://www.example.com/sample-repo/environments/101","created_at":"2025-05-18T09:00:00Z","updated_at":"2025-05-18T10:00:00Z","protection_rules":[{"id":10,"node_id":"RULENODE1_xyz890=","type":"BasicRule"}],"deployment_branch_policy":{"protected_branches":true,"custom_branch_policies":false}},{"id":102,"node_id":"ENVNODE2_def456=","name":"Production (Test)","url":"https://api.example.com/repos/example-org/sample-repo/environments/102","html_url":"https://www.example.com/sample-repo/environments/102","created_at":"2025-05-17T08:30:00Z","updated_at":"2025-05-18T11:15:00Z","protection_rules":[{"id":201,"node_id":"RULENODE2_ghi789=","type":"TimedRelease","wait_timer":60},{"id":202,"node_id":"RULENODE3_jkl012=","type":"BasicRule"}]}]};
}

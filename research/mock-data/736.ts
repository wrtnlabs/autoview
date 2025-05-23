
import Component from "../components/736";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"custom_deployment_protection_rules":[{"id":101,"node_id":"NODEID_deploy_prot_101_abc123=","enabled":true,"app":{"id":11,"slug":"sample-deployment-protection-app","integration_url":"https://api.example.com/v1/apps/sample-deployment-protection-app","node_id":"NODEID_app_11_def456="}},{"id":102,"node_id":"NODEID_deploy_prot_102_xyz789=","enabled":false,"app":{"id":12,"slug":"another-protection-app","integration_url":"https://api.example.com/v1/apps/another-protection-app","node_id":"NODEID_app_12_ghi012="}}]};
}

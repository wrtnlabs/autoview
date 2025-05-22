
import Component from "../components/736";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"custom_deployment_protection_rules":[{"id":101,"node_id":"NODEID_DPR_abc123XYZ=","enabled":true,"app":{"id":201,"slug":"sample-deployment-rule-app","integration_url":"https://api.github.com/apps/sample-deployment-rule-app","node_id":"NODEID_APP_ghi789OPQ="}},{"id":102,"node_id":"NODEID_DPR_def456LMN=","enabled":false,"app":{"id":202,"slug":"dummy-protection-app","integration_url":"https://api.github.com/apps/dummy-protection-app","node_id":"NODEID_APP_jkl012RST="}}]};
}

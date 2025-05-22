
import Component from "../components/736";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":1,"custom_deployment_protection_rules":[{"id":101,"node_id":"NODEID_deployment_rule_101","enabled":true,"app":{"id":501,"slug":"sample-deployment-protection-app","integration_url":"https://api.example.com/apps/sample-deployment-protection-app","node_id":"NODEID_app_501"}},{"id":102,"node_id":"NODEID_deployment_rule_102","enabled":false,"app":{"id":502,"slug":"dummy-protection-app","integration_url":"https://api.example.com/apps/dummy-protection-app","node_id":"NODEID_app_502"}}]};
}

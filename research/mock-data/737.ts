
import Component from "../components/737";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"NODEID_deployment_protection_rule_789XYZabc=","enabled":true,"app":{"id":7,"slug":"sample-deployment-protection-app","integration_url":"https://api.example.com/v1/apps/sample-deployment-protection-app","node_id":"NODEID_custom_deployment_rule_app_xyz789DEF="}};
}

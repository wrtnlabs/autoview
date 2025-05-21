
import Component from "../components/738";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"available_custom_deployment_protection_rule_integrations":[{"id":101,"slug":"custom-deployment-rule-app-alpha","integration_url":"https://api.example.org/v1/apps/custom-deployment-rule-app-alpha","node_id":"NODEID_CustomDeploymentRuleApp_alpha_101"},{"id":102,"slug":"custom-deployment-rule-app-beta","integration_url":"https://api.example.org/v1/apps/custom-deployment-rule-app-beta","node_id":"NODEID_CustomDeploymentRuleApp_beta_102"}]};
}

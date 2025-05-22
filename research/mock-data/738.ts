
import Component from "../components/738";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"available_custom_deployment_protection_rule_integrations":[{"id":101,"slug":"sample-deployment-protection-app","integration_url":"https://api.example.com/v1/apps/sample-deployment-protection-app","node_id":"NODEID_CustomDeploymentRuleApp_abc123="},{"id":102,"slug":"test-protection-rule-bot","integration_url":"https://api.example.com/v1/apps/test-protection-rule-bot","node_id":"NODEID_TestProtectionRuleBot_def456="}]};
}

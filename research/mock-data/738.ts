
import Component from "../components/738";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"available_custom_deployment_protection_rule_integrations":[{"id":42,"slug":"sample-protection-rule-app","integration_url":"https://api.example.com/v1/apps/sample-protection-rule-app","node_id":"NODEID_SampleApp_abc123="},{"id":84,"slug":"test-deployment-protection-rule","integration_url":"https://api.example.com/v1/apps/test-deployment-protection-rule","node_id":"NODEID_TestApp_xyz789="}]};
}

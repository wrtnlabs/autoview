
import Component from "../components/737";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345,"node_id":"NODEID_SampleDeploymentProtectionRule_abc123XYZ==","enabled":true,"app":{"id":67890,"slug":"sample-deployment-protection-app","integration_url":"https://api.example.com/v1/apps/sample-deployment-protection-app","node_id":"NODEID_SampleAppIntegration_987ZYX=="}};
}

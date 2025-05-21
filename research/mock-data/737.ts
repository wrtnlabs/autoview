
import Component from "../components/737";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"DEP_PROT_RULE_NodeID_123abcXYZ=","enabled":true,"app":{"id":202,"slug":"sample-deployment-rule-app","integration_url":"https://api.example.com/v1/apps/sample-deployment-rule-app","node_id":"APP_NODEID_sampleDeployRule_456defLMN="}};
}

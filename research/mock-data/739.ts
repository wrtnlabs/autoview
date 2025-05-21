
import Component from "../components/739";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"NODEID_DeployProtRule_abc123XYZ=","enabled":true,"app":{"id":84,"slug":"custom-deployment-protection-app-sample","integration_url":"https://api.example.com/v1/deployment-protection-rule-apps/custom-deployment-protection-app-sample","node_id":"NODEID_CustomDeployApp_def456UVW="}};
}


import Component from "../components/739";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"DEPLOY_PR_TEST_node_12345XYZ","enabled":true,"app":{"id":101,"slug":"sample-deployment-protection-rule-app","integration_url":"https://api.example.com/apps/sample-deployment-protection-rule-app","node_id":"APP_NODEID_SAMPLE_7890ABC"}};
}

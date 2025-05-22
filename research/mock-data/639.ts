
import Component from "../components/639";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/repos/sample-org/sample-repo/branches/main/protection/required_status_checks","strict":true,"contexts":["continuous-integration/sample-ci","security-scan","code-coverage"],"checks":[{"context":"continuous-integration/sample-ci","app_id":1024},{"context":"security-scan","app_id":null},{"context":"code-coverage","app_id":2048}],"contexts_url":"https://api.example.com/v1/repos/sample-org/sample-repo/branches/main/protection/required_status_checks/contexts"};
}

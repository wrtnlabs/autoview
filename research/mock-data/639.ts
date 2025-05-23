
import Component from "../components/639";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/repos/example-org/sample-repo/protection/required_status_checks","strict":true,"contexts":["continuous-integration/sample-build","security/scan-dummy"],"checks":[{"context":"continuous-integration/sample-build","app_id":4512},{"context":"security/scan-dummy","app_id":null}],"contexts_url":"https://api.example.com/v1/repos/example-org/sample-repo/protection/required_status_checks/contexts"};
}

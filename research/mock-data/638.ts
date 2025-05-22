
import Component from "../components/638";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/repos/example-org/sample-repo/branches/main/protection/required_status_checks","strict":true,"contexts":["ci/build","codeql/security-scan"],"checks":[{"context":"ci/build","app_id":123456},{"context":"codeql/security-scan","app_id":null}],"contexts_url":"https://api.example.com/repos/example-org/sample-repo/branches/main/protection/required_status_checks/contexts"};
}

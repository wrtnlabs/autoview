
import Component from "../components/638";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/repos/sample-org/sample-repo/status_check_policy","strict":true,"contexts":["continuous-integration/sample-tests","security-scan"],"checks":[{"context":"continuous-integration/sample-tests","app_id":12345},{"context":"security-scan","app_id":null}],"contexts_url":"https://api.example.com/repos/sample-org/sample-repo/status_check_policy/contexts"};
}


import Component from "../components/639";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/status-check-policy/sample-policy","strict":true,"contexts":["ci/build-sample","security/scan-test"],"checks":[{"context":"ci/build-sample","app_id":4567},{"context":"security/scan-test","app_id":null}],"contexts_url":"https://www.example.com/v1/status-check-policy/sample-policy/contexts"};
}

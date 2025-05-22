
import Component from "../components/638";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/status-check-policy/sample-01","strict":true,"contexts":["ci/build","security/scan"],"checks":[{"context":"ci/build","app_id":101},{"context":"security/scan","app_id":null}],"contexts_url":"https://api.example.com/v1/status-check-policy/sample-01/contexts"};
}

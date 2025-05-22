
import Component from "../components/585";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"github_owned_allowed":false,"verified_allowed":true,"patterns_allowed":["actions/checkout@v3","example-org/ui-components-sample@*","monalisa/octocat@v2","custom-actions/test-action@abcdef123"]};
}

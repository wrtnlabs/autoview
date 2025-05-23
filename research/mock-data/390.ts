
import Component from "../components/390";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"github_owned_allowed":false,"verified_allowed":true,"patterns_allowed":["sample-org/sample-action@v2","sample-org/*","another-sample-org/ci-action@abcdef123"]};
}

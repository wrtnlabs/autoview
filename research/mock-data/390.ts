
import Component from "../components/390";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"github_owned_allowed":true,"verified_allowed":false,"patterns_allowed":["actions/checkout@v3","sample-org/*","another-user/custom-action@*"]};
}

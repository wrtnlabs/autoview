
import Component from "../components/585";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"github_owned_allowed":true,"verified_allowed":false,"patterns_allowed":["actions/sample-action@v1","my-org/custom-action@*","octocat/hello-world@f0e1d2c3"]};
}

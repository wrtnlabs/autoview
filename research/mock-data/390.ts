
import Component from "../components/390";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"github_owned_allowed":false,"verified_allowed":true,"patterns_allowed":["actions/checkout@v3","example-org/custom-action@*","thirdparty/vendor-action@deadbeefdeadbeefdeadbeefdeadbeefdeadbeef"]};
}

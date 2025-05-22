
import Component from "../components/386";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"include_claim_keys":["sub","email","preferred_username","given_name","custom_claim_test"]};
}

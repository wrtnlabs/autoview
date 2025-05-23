
import Component from "../components/386";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"include_claim_keys":["sub","custom_claim_1","role_id","project_id"]};
}


import Component from "../components/579";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"use_default":false,"include_claim_keys":["project_id","environment_name","custom_claim_key"]};
}

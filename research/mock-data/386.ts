
import Component from "../components/386";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"include_claim_keys":["sub","iss","email_verified","user_role","session_id_test"]};
}

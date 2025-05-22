
import Component from "../components/579";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"use_default":false,"include_claim_keys":["test_claim_key1","sample_repo_id","build_number_test"]};
}

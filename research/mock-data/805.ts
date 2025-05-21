
import Component from "../components/805";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"message":"Fast-forward merge of 'main' into 'feature/sample-ui' succeeded (Sample)","merge_type":"fast-forward","base_branch":"feature/sample-ui"};
}

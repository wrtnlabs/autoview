
import Component from "../components/805";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"message":"Merged upstream changes from origin/main into dev-sandbox (Sample)","merge_type":"merge","base_branch":"dev-sandbox"};
}

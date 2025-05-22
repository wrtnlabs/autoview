
import Component from "../components/735";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"DEPLOY_POLICY_42_sample","name":"release/v1.*","type":"branch"};
}

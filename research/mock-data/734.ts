
import Component from "../components/734";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"DEPL_POLICY_node_abc123XYZ=","name":"release/v*-test","type":"branch"};
}

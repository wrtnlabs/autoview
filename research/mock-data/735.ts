
import Component from "../components/735";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"NODEID_SampleDeploymentPolicy_101","name":"release/*","type":"branch"};
}

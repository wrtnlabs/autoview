
import Component from "../components/733";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"NODEID_deploymentBranchPolicy_42Sample==","name":"release/*-sample","type":"branch"};
}

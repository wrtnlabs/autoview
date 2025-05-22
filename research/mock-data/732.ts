
import Component from "../components/732";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"branch_policies":[{"id":201,"node_id":"NODEID_deployBranchPolicy_abc123XYZ","name":"feature/*","type":"branch"},{"id":202,"name":"v[0-9]+(\\.[0-9]+)*","type":"tag"}]};
}

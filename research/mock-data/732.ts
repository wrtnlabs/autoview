
import Component from "../components/732";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"branch_policies":[{"id":101,"node_id":"NODEID_TestPolicy101","name":"release/*-sample","type":"branch"},{"id":202,"type":"tag"},{"name":"feature/new-ui-test","type":"branch"}]};
}

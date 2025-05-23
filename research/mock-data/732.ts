
import Component from "../components/732";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"branch_policies":[{"id":101,"node_id":"MDE6QnJhbmNoUG9saWN5MTIz","name":"feature/*","type":"branch"},{"id":204,"node_id":"MDE6QnJhbmNoUG9saWN5NDU2","name":"release-v*","type":"branch"},{"id":305,"node_id":"MDE6QnJhbmNoUG9saWN5Nzg5","type":"tag"}]};
}

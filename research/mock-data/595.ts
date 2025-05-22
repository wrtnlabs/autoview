
import Component from "../components/595";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":1,"name":"self-hosted (Test)","type":"read-only"},{"id":2,"name":"gpu-runner-sample","type":"custom"},{"id":3,"name":"temporary-runner-sample"}]};
}


import Component from "../components/407";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":201,"name":"gpu-test-runner-sample","type":"custom"},{"id":202,"name":"linux-x64-sample","type":"read-only"},{"name":"default-runner-test"}]};
}

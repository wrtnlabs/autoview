
import Component from "../components/596";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"labels":[{"id":101,"name":"self-hosted","type":"read-only"},{"name":"gpu-accelerated-runner-sample","type":"custom"}]};
}

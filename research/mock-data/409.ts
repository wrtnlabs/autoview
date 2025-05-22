
import Component from "../components/409";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"labels":[{"id":101,"name":"ubuntu-latest (Test Runner)","type":"read-only"},{"name":"gpu-sample-runner"}]};
}

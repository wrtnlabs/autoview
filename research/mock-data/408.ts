
import Component from "../components/408";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":1,"name":"gpu-runner-sample","type":"custom"},{"id":2,"name":"self-hosted (Test)","type":"read-only"},{"name":"windows-runner-test"}]};
}

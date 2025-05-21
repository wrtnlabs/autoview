
import Component from "../components/595";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":1,"name":"linux-x86_64 (Test)","type":"read-only"},{"id":2,"name":"windows-latest-sample","type":"custom"},{"name":"gpu-runner-density-sample"}]};
}


import Component from "../components/596";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"linux-runner-sample (Test)","type":"read-only"},{"id":102,"name":"gpu-test-runner (Sample)","type":"custom"},{"name":"macos-runner (Sample)"}]};
}

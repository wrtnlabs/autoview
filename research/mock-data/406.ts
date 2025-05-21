
import Component from "../components/406";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":1,"name":"self-hosted (Sample)","type":"read-only"},{"id":2,"name":"gpu-test-runner (Sample)","type":"custom"},{"name":"windows-sample-runner (Test)"}]};
}

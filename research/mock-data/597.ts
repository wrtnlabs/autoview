
import Component from "../components/597";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":10,"name":"linux-sample-runner (Test)","type":"read-only"},{"id":20,"name":"gpu-sample-runner (Dummy)","type":"custom"},{"name":"windows-sample-runner (Sample)"}]};
}

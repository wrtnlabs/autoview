
import Component from "../components/407";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"labels":[{"id":1001,"name":"gpu-runner-sample (Test)","type":"custom"},{"name":"linux-x64-runner (Sample)"}]};
}


import Component from "../components/405";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"linux-self-hosted (Test)","type":"read-only"},{"id":102,"name":"gpu-accelerated-runner (Sample)","type":"custom"},{"name":"windows-legacy-runner"}]};
}

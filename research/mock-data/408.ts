
import Component from "../components/408";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"labels":[{"id":42,"name":"self-hosted-linux-runner (Sample)","type":"read-only"},{"name":"gpu-accelerated-runner-test","type":"custom"}]};
}

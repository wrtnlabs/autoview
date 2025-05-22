
import Component from "../components/409";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"linux-runner-sample","type":"custom"},{"name":"read-only-windows-runner","type":"read-only"},{"id":103,"name":"gpu-accelerated-test-runner"}]};
}

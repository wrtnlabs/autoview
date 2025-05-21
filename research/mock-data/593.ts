
import Component from "../components/593";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"self-hosted-runner-sample","type":"read-only"},{"id":202,"name":"gpu-runner-test","type":"custom"},{"name":"linux-mac-sample"}]};
}

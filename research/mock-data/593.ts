
import Component from "../components/593";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"linux-runner-sample","type":"custom"},{"name":"windows-runner-sample"},{"id":103,"name":"mac-runner-test","type":"read-only"}]};
}

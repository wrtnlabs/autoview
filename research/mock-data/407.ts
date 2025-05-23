
import Component from "../components/407";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"linux-runner-sample","type":"read-only"},{"id":102,"name":"windows-runner-sample","type":"custom"},{"name":"macos-runner-sample"}]};
}

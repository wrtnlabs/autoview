
import Component from "../components/405";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":4,"labels":[{"id":1,"name":"ubuntu-latest-sample","type":"read-only"},{"id":2,"name":"self-hosted-linux-sample","type":"custom"},{"name":"windows-2019-sample"},{"id":5,"name":"macos-11-sample"}]};
}

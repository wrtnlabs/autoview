
import Component from "../components/593";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"linux-sample-runner","type":"custom"},{"id":102,"name":"windows-sample-runner","type":"custom"},{"name":"macos-sample-runner","type":"read-only"}]};
}

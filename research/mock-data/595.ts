
import Component from "../components/595";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":4,"labels":[{"id":301,"name":"linux-sample-runner","type":"custom"},{"id":302,"name":"windows-build (Test)","type":"read-only"},{"name":"macos-sample-runner"},{"id":304,"name":"arm64-runner","type":"custom"}]};
}

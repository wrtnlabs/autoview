
import Component from "../components/596";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":1001,"name":"linux-x64-readonly-sample","type":"read-only"},{"id":1002,"name":"windows-gpu-runner-test"},{"name":"macos-arm64-custom-fake","type":"custom"}]};
}

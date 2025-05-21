
import Component from "../components/594";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":1001,"name":"self-hosted (Sample)","type":"custom"},{"id":1002,"name":"windows-latest (Test)","type":"read-only"},{"name":"macos-latest (Dummy)"}]};
}

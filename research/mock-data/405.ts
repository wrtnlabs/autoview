
import Component from "../components/405";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":11,"name":"Default Runner (Sample)"},{"name":"Windows Runner (Dummy)","type":"read-only"},{"id":33,"name":"GPU Intensive Runner (Test)","type":"custom"}]};
}

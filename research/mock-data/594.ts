
import Component from "../components/594";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"Self-Hosted Runner (Sample)","type":"read-only"},{"id":102,"name":"High-Memory Runner (Test)","type":"custom"},{"name":"GPU-Accelerated Runner (Dummy)"}]};
}

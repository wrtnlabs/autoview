
import Component from "../components/594";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"self-hosted (Test)","type":"read-only"},{"id":102,"name":"linux (Sample)","type":"custom"},{"name":"x64 (Dummy)"}]};
}

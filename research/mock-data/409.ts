
import Component from "../components/409";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"labels":[{"id":101,"name":"agent-linux-x64 (Test)","type":"custom"},{"name":"self-hosted-windows (Test)"}]};
}

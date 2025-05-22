
import Component from "../components/597";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"builder-gpu-runner-sample","type":"custom"},{"id":102,"name":"self-hosted-windows-x64","type":"read-only"},{"name":"generic-runner-label-test"}]};
}

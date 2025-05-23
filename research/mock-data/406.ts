
import Component from "../components/406";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":101,"name":"linux-x64-sample","type":"custom"},{"id":102,"name":"self-hosted (Test)"},{"name":"windows-x86-sample","type":"read-only"}]};
}

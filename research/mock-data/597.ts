
import Component from "../components/597";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":301,"name":"Read-Only Runner (Test)","type":"read-only"},{"name":"Generic Runner Dummy"},{"id":302,"name":"Custom GPU Runner Sample","type":"custom"}]};
}

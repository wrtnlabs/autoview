
import Component from "../components/404";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"runner_group_id":256,"name":"sample-runner-01 (Test)","os":"linux","status":"online","busy":false,"labels":[{"id":1,"name":"self-hosted","type":"read-only"},{"id":2,"name":"x64","type":"custom"},{"name":"gpu","type":"custom"}],"ephemeral":false};
}

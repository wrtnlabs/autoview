
import Component from "../components/404";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"runner_group_id":10,"name":"Self-Hosted Runner Sample #1 (Test)","os":"linux","status":"online","busy":false,"labels":[{"id":1001,"name":"linux","type":"read-only"},{"name":"gpu","type":"custom"}],"ephemeral":false};
}


import Component from "../components/592";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"runner_group_id":7,"name":"Sample Runner (Test)","os":"linux","status":"online","busy":false,"labels":[{"id":101,"name":"self-hosted","type":"read-only"},{"name":"gpu-accelerated","type":"custom"}],"ephemeral":true};
}

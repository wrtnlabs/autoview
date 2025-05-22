
import Component from "../components/398";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"runner_group_id":10,"name":"Sample Runner A (Test)","os":"ubuntu-20.04","status":"online","busy":false,"labels":[{"id":201,"name":"self-hosted","type":"read-only"},{"id":202,"name":"ubuntu","type":"custom"}]},{"id":102,"name":"Sample Runner B (Test)","os":"windows-2022","status":"offline","busy":false,"labels":[{"name":"self-hosted","type":"read-only"},{"name":"windows","type":"custom"}],"ephemeral":true}]};
}

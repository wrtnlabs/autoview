
import Component from "../components/399";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"runner_group_id":2001,"name":"Sample Runner Alpha (Test)","os":"Ubuntu 20.04","status":"online","busy":false,"labels":[{"id":501,"name":"self-hosted","type":"read-only"},{"name":"linux","type":"custom"}]},{"id":102,"name":"Ephemeral Runner Beta Dummy","os":"Windows Server 2019","status":"offline","busy":true,"labels":[{"id":502,"name":"windows","type":"read-only"}],"ephemeral":true}]};
}

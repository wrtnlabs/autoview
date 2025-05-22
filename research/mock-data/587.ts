
import Component from "../components/587";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"runner_group_id":10,"name":"Linux Sample Runner (Test)","os":"Linux","status":"online","busy":false,"labels":[{"id":11,"name":"ubuntu-latest","type":"read-only"},{"name":"self-hosted"}]},{"id":102,"name":"Windows Test Runner (Sample)","os":"Windows","status":"online","busy":true,"labels":[{"id":21,"name":"windows-latest","type":"read-only"},{"name":"gpu","type":"custom"}],"ephemeral":true}]};
}

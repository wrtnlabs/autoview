
import Component from "../components/399";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"runner_group_id":10,"name":"self-hosted-runner-01 (Test)","os":"linux","status":"online","busy":false,"labels":[{"id":501,"name":"self-hosted","type":"custom"},{"name":"Linux","type":"read-only"}],"ephemeral":false},{"id":102,"name":"ephemeral-runner-02 (Sample)","os":"Windows","status":"offline","busy":false,"labels":[{"name":"Windows","type":"read-only"}],"ephemeral":true}]};
}

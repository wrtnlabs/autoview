
import Component from "../components/399";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"runner_group_id":5,"name":"sample-runner-01","os":"linux","status":"online","busy":false,"labels":[{"id":1,"name":"self-hosted","type":"read-only"},{"name":"linux","type":"read-only"}]},{"id":102,"name":"gpu-test-runner","os":"linux","status":"offline","busy":false,"labels":[{"id":3,"name":"self-hosted","type":"read-only"},{"id":4,"name":"GPU","type":"custom"}],"ephemeral":true}]};
}

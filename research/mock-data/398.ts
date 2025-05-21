
import Component from "../components/398";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"runner_group_id":5,"name":"sample-runner-01 (Test)","os":"linux","status":"online","busy":false,"labels":[{"id":1001,"name":"self-hosted","type":"read-only"},{"id":1002,"name":"x64","type":"custom"}],"ephemeral":false},{"id":102,"name":"windows-runner-sample","os":"windows","status":"offline","busy":true,"labels":[{"name":"windows"}],"ephemeral":true}]};
}

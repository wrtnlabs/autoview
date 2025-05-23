
import Component from "../components/587";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"runner_group_id":5,"name":"runner-linux-sample-1 (Test)","os":"linux","status":"online","busy":false,"labels":[{"id":201,"name":"self-hosted","type":"read-only"},{"id":202,"name":"linux","type":"read-only"},{"name":"ubuntu-20.04","type":"custom"}],"ephemeral":false},{"id":102,"name":"runner-windows-sample-2 (Sample)","os":"windows","status":"offline","busy":true,"labels":[{"name":"self-hosted","type":"read-only"},{"name":"windows","type":"read-only"}],"ephemeral":true}]};
}

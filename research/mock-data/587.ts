
import Component from "../components/587";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":123,"runner_group_id":10,"name":"Self-Hosted Runner A (Test)","os":"Linux","status":"online","busy":false,"labels":[{"id":201,"name":"self-hosted","type":"read-only"},{"id":202,"name":"linux","type":"custom"}]},{"id":124,"name":"Ephemeral Runner B (Sample)","os":"Windows","status":"offline","busy":false,"labels":[{"id":203,"name":"self-hosted","type":"read-only"}],"ephemeral":true}]};
}

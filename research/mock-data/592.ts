
import Component from "../components/592";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":102,"runner_group_id":7,"name":"Test Runner (Sample)","os":"ubuntu-20.04","status":"online","busy":false,"labels":[{"id":1001,"name":"self-hosted","type":"read-only"},{"name":"high-memory","type":"custom"}],"ephemeral":true};
}


import Component from "../components/592";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":128,"runner_group_id":8,"name":"Test Runner (Sample)","os":"linux","status":"online","busy":false,"labels":[{"id":101,"name":"self-hosted","type":"read-only"},{"name":"linux","type":"custom"}],"ephemeral":true};
}


import Component from "../components/404";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"runner_group_id":10,"name":"Test Runner (Sample)","os":"linux","status":"online","busy":false,"labels":[{"id":1,"name":"self-hosted","type":"read-only"},{"id":2,"name":"gpu-test-runner-sample","type":"custom"}],"ephemeral":true};
}

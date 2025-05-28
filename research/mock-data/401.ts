
import Component from "../components/401";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"runner":{"id":101,"runner_group_id":10,"name":"Sample Runner 01 (Test)","os":"ubuntu-latest","status":"online","busy":false,"labels":[{"id":201,"name":"self-hosted","type":"read-only"},{"name":"ubuntu-latest","type":"custom"}],"ephemeral":false},"encoded_jit_config":"eyJ0YXNrcyI6WyJzZXR1cCIsImJ1aWxkIiwidGVzdCJdLCJ0aW1lb3V0IjoxMjB9"};
}

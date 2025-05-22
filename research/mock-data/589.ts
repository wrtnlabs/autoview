
import Component from "../components/589";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"runner":{"id":42,"runner_group_id":7,"name":"Sample Runner (Test)","os":"ubuntu-latest","status":"online","busy":false,"labels":[{"id":10,"name":"self-hosted","type":"read-only"},{"name":"demo-label","type":"custom"}],"ephemeral":true},"encoded_jit_config":"ZWNobyAiU2FtcGxlIFJ1bm5lciBDb25maWd1cmF0aW9uIiA+IC9kZXYvbnVsbA=="};
}

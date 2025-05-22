
import Component from "../components/589";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"runner":{"id":101,"runner_group_id":5,"name":"self-hosted-runner-sample-01 (Test)","os":"Linux","status":"online","busy":false,"labels":[{"id":1,"name":"self-hosted","type":"read-only"},{"name":"linux-x64","type":"custom"}],"ephemeral":false},"encoded_jit_config":"eyJydW5faWQiOjEwMSwidGVtcCI6dHJ1ZX0="};
}

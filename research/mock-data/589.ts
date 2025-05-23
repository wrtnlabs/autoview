
import Component from "../components/589";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"runner":{"id":98765,"runner_group_id":101,"name":"Sample Runner (Test)","os":"ubuntu-20.04","status":"online","busy":false,"labels":[{"id":301,"name":"self-hosted","type":"read-only"},{"name":"gpu-test","type":"custom"},{"id":302,"name":"linux"}],"ephemeral":true},"encoded_jit_config":"ZHVtbXkgY29uZmlnIGNvbnRlbnQgc2FtcGxl"};
}

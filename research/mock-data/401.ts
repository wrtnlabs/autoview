
import Component from "../components/401";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"runner":{"id":42,"runner_group_id":7,"name":"self-hosted-runner-01 (Test)","os":"linux","status":"online","busy":false,"labels":[{"id":1,"name":"self-hosted","type":"read-only"},{"id":2,"name":"gpu-test-runner (Sample)","type":"custom"}],"ephemeral":false},"encoded_jit_config":"ZXBocGVtZXJhbCBydW5uZXIgY29uZmlnIGRhdGEgKFNpbXVsYXRlZCk="};
}

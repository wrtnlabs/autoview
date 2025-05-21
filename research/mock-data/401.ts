
import Component from "../components/401";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"runner":{"id":12345,"runner_group_id":678,"name":"Sample Runner (Test)","os":"Ubuntu 22.04 LTS (Test Environment)","status":"online","busy":false,"labels":[{"id":1,"name":"self-hosted","type":"read-only"},{"id":2,"name":"x64","type":"custom"}],"ephemeral":false},"encoded_jit_config":"eyJ1cmwiOiJodHRwczovL2FwaS5leGFtcGxlLmNvbS9ydW5uZXJzLzEyMzQ1IiwidG9rZW4iOiJkdW1teV90b2tlbl9zYW1wbGUiLCJsYWJlbHMiOlsic2VsZi1ob3N0ZWQiLCJ4NjQiXX0="};
}


import Component from "../components/861";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"actor_id":2001,"actor_name":"sample-developer","before_sha":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","after_sha":"b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0","ref":"refs/heads/feature/sample-test","repository_id":50001,"repository_name":"sample-repo","pushed_at":"2025-05-19T12:34:56Z","result":"pass","evaluation_result":"pass"},{"id":102,"actor_id":3002,"actor_name":"ci-bot-sample","before_sha":"c0ffee1234567890abcdef1234567890abcdef12","after_sha":"deadbeef1234567890abcdef1234567890abcdef","ref":"refs/tags/v1.2.0-sample","repository_id":60002,"repository_name":"dummy-project","pushed_at":"2025-05-18T08:00:00Z","result":"fail","evaluation_result":"bypass"}];
}

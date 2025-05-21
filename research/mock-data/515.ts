
import Component from "../components/515";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"actor_id":1001,"actor_name":"test-user-sample","before_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","after_sha":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","ref":"refs/heads/main-test","repository_id":5001,"repository_name":"sample-repo-test","pushed_at":"2025-05-19T14:30:45Z","result":"pass","evaluation_result":"pass"},{"id":102,"actor_name":"ci-bot-test","repository_name":"dummy-repo-sample","result":"fail","evaluation_result":"bypass"},{"actor_id":2020,"before_sha":"d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3","after_sha":"e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6","ref":"refs/heads/feature/sample-ui","pushed_at":"2025-05-18T09:15:00Z","result":"bypass","evaluation_result":"fail"}];
}

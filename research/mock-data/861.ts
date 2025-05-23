
import Component from "../components/861";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":4210,"actor_id":865,"actor_name":"SampleUser (Test)","before_sha":"a1b2c3d4e5f678901234567890abcdef12345678","after_sha":"1234567890abcdef12345678abcdef9012345678","ref":"refs/heads/feature/sample-ui-mock","repository_id":112233,"repository_name":"sample-repo-ui-testing","pushed_at":"2025-05-19T08:30:00Z","result":"pass","evaluation_result":"pass"},{"actor_name":"TestActor (Dummy)","repository_name":"dummy-repo","result":"fail"}];
}

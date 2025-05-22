
import Component from "../components/862";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"actor_id":202,"actor_name":"TestActor (Dummy)","before_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","after_sha":"a1b2c3d4e5f60718273645566778899aabbccdde","ref":"refs/heads/test-branch-sample","repository_id":3001,"repository_name":"sample-repo-test","pushed_at":"2025-05-19T14:45:00Z","result":"pass","evaluation_result":"fail","rule_evaluations":[{"rule_source":{"type":"RepositoryRuleSet","id":5002,"name":"StandardRuleSet (Test)"},"enforcement":"active","result":"pass","rule_type":"security","details":null},{"rule_source":{"type":"ManualRule","id":null,"name":"CustomRule (Sample)"},"enforcement":"evaluate","result":"fail","rule_type":"quality","details":"Sample quality check failed due to missing criteria."},{"rule_source":{"type":"ExternalRule","id":5010,"name":null},"enforcement":"deleted ruleset","result":"fail","rule_type":"compliance","details":"Rule set has been deleted and cannot be evaluated."}]};
}

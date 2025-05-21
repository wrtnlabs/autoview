
import Component from "../components/862";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123,"actor_id":456,"actor_name":"test-user-sample","before_sha":"abc123def456ghi789jkl012mno345pqr678stu9","after_sha":"def456ghi789jkl012mno345pqr678stu901abc2","ref":"refs/heads/sample-test-branch","repository_id":789,"repository_name":"sample-repo-test","pushed_at":"2025-05-19T16:45:00Z","result":"pass","evaluation_result":"fail","rule_evaluations":[{"rule_source":{"type":"Built-in Rule","id":1,"name":"Required Reviews (Sample)"},"enforcement":"active","result":"pass","rule_type":"require_reviews","details":null},{"rule_source":{"type":"Custom Rule","id":2,"name":"Label Check (Sample)"},"enforcement":"evaluate","result":"fail","rule_type":"label_required","details":"Missing required label 'bug' (Sample message)."},{"rule_source":{"type":"Legacy Rule Set","id":null,"name":null},"enforcement":"deleted ruleset","result":"pass","rule_type":"legacy_policy","details":null}]};
}

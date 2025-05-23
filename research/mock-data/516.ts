
import Component from "../components/516";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"actor_id":502,"actor_name":"sampleuser-test","before_sha":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","after_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","ref":"refs/heads/main-test","repository_id":2025,"repository_name":"example-repo","pushed_at":"2025-05-19T14:30:00Z","result":"fail","evaluation_result":"fail","rule_evaluations":[{"rule_source":{"type":"branch_protection","id":301,"name":"Require pull request reviews (Test)"},"enforcement":"active","result":"pass","rule_type":"pull_request_reviews","details":null},{"rule_source":{"type":"code_owner","id":null,"name":null},"enforcement":"evaluate","result":"fail","rule_type":"code_owner_review","details":"Missing CODEOWNERS file in repository root for evaluated paths."}]};
}


import Component from "../components/858";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"NODEID_TestRepoRule_abc123XYZ=","name":"Sample Repository Rule (Test)","pattern":"feature/*","rule_type":"branch","enforcement":"enabled","created_at":"2025-05-19T08:00:00Z","updated_at":"2025-05-19T12:00:00Z","url":"https://api.example.com/repos/example-org/sample-repo/rules/101","namespace":{"id":202,"type":"Organization","name":"Sample Org (Test)"},"author":{"login":"test.user","id":303,"type":"User"},"description":"A sample repository rule for UI testing. This rule enforces branch naming conventions for feature branches."},{"id":102,"node_id":"NODEID_TestRepoRule_def456UVW=","name":"Dummy Repository Rule 2","pattern":"release/v*","rule_type":"tag","enforcement":"disabled","created_at":"2025-01-01T00:00:00Z","updated_at":"2025-05-18T23:59:59Z","url":"https://api.example.com/repos/example-org/sample-repo/rules/102","namespace":{"id":204,"type":"Organization","name":"Example Corp (Sample)"},"author":{"login":"sample.contributor","id":404,"type":"User"},"description":"This is a dummy rule to test tag pattern matching in UI components."}];
}

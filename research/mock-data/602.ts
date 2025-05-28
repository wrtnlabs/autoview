
import Component from "../components/602";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"artifacts":[{"id":1001,"node_id":"NODEID_ARTIFACT_1001","name":"artifact-sample-build-output","size_in_bytes":256000,"url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/1001","archive_download_url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/1001/zip","expired":false,"created_at":"2025-05-19T10:00:00Z","expires_at":"2025-06-19T10:00:00Z","updated_at":"2025-05-19T12:00:00Z","digest":"3a7bd3e2360a64e8bbf587e0d5d5e3a3b1c0d2f4e5a6b7c8d9e0f1a2b3c4d5e6","workflow_run":{"id":2001,"repository_id":3001,"head_repository_id":3001,"head_branch":"feature/sample-artifact","head_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"}},{"id":1002,"node_id":"NODEID_ARTIFACT_1002","name":"artifact-test-coverage-report","size_in_bytes":51200,"url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/1002","archive_download_url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/1002/zip","expired":true,"created_at":"2025-05-18T08:30:00Z","expires_at":"2025-05-20T08:30:00Z","updated_at":"2025-05-18T09:00:00Z","digest":null,"workflow_run":null}]};
}


import Component from "../components/572";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"artifacts":[{"id":101,"node_id":"MDg6QXJ0aWZhY3QxMDE=","name":"sample-artifact-101 (Test)","size_in_bytes":2048,"url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/101","archive_download_url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/101/zip","expired":false,"created_at":"2025-05-19T09:15:00Z","expires_at":"2025-05-26T09:15:00Z","updated_at":"2025-05-19T09:20:00Z","digest":"abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890","workflow_run":{"id":2001,"repository_id":5001,"head_repository_id":5001,"head_branch":"feature/sample-artifact-test","head_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"}},{"id":102,"node_id":"MDg6QXJ0aWZhY3QxMDI=","name":"sample-artifact-102 (Dummy)","size_in_bytes":5120,"url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/102","archive_download_url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/102/zip","expired":true,"created_at":"2025-04-30T12:00:00Z","expires_at":null,"updated_at":"2025-05-01T08:00:00Z","digest":null,"workflow_run":null}]};
}

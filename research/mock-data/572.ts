
import Component from "../components/572";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"artifacts":[{"id":1,"node_id":"NODEID_SampleArtifact_ABC123","name":"build-output-sample.zip","size_in_bytes":204800,"url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/1","archive_download_url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/1/zip","expired":false,"created_at":"2025-05-18T08:30:00Z","expires_at":"2025-06-17T08:30:00Z","updated_at":"2025-05-18T09:00:00Z","digest":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","workflow_run":{"id":101,"repository_id":5001,"head_repository_id":6002,"head_branch":"feature/sample-A","head_sha":"abcdef1234567890abcdef1234567890abcdef12"}},{"id":2,"node_id":"NODEID_SampleArtifact_DEF456","name":"test-logs-sample.tar.gz","size_in_bytes":102400,"url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/2","archive_download_url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/2/tar","expired":true,"created_at":null,"expires_at":null,"updated_at":null,"digest":null,"workflow_run":null}]};
}

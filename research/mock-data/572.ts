
import Component from "../components/572";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"artifacts":[{"id":123456,"node_id":"MDg6QXJ0aWZhY3QxMjM0NTY=","name":"sample-artifact-01.zip","size_in_bytes":204800,"url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/123456","archive_download_url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/123456/zip","expired":false,"created_at":"2025-05-18T09:15:00Z","expires_at":"2025-06-17T09:15:00Z","updated_at":"2025-05-18T10:00:00Z","digest":"abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890","workflow_run":{"id":78910,"repository_id":55522,"head_repository_id":55522,"head_branch":"feature/sample-artifact-upload","head_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"}},{"id":7891011,"node_id":"MDg6QXJ0aWZhY3Q3ODkxMDEx","name":"legacy-artifact (Sample)","size_in_bytes":102400,"url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/7891011","archive_download_url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/7891011/zip","expired":true,"created_at":"2024-12-01T14:30:00Z","expires_at":null,"updated_at":"2025-01-01T00:00:00Z","workflow_run":null}]};
}

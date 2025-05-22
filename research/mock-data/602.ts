
import Component from "../components/602";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"artifacts":[{"id":123456,"node_id":"MDg6QXJ0aWZhY3Q6MTIzNDU2","name":"build-artifacts-test","size_in_bytes":1048576,"url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/123456","archive_download_url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/123456/zip","expired":false,"created_at":"2025-05-18T10:15:30Z","expires_at":"2025-06-17T10:15:30Z","updated_at":"2025-05-19T12:00:00Z","digest":"2f776931b0cf5e7fa1d4e33c76dc4e06f2a2345b6c7d8e9f0a1b2c3d4e5f6a7b","workflow_run":{"id":654321,"repository_id":98765,"head_repository_id":98765,"head_branch":"main-test","head_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"}},{"id":789012,"node_id":"MDg6QXJ0aWZhY3Q6Nzg5MDEy","name":"deployment-logs-sample","size_in_bytes":2048,"url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/789012","archive_download_url":"https://api.github.com/repos/example-org/sample-repo/actions/artifacts/789012/zip","expired":true,"created_at":"2025-04-01T08:00:00Z","expires_at":"2025-05-01T08:00:00Z","updated_at":"2025-04-15T09:30:00Z","digest":null,"workflow_run":null}]};
}

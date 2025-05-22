
import Component from "../components/573";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123456,"node_id":"MDg6QXJ0aWZhY3Q6MTIzNDU2Nzg5","name":"sample-artifact-package (Test)","size_in_bytes":2048,"url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/123456","archive_download_url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/123456/zip","expired":false,"created_at":"2025-05-19T14:30:00Z","expires_at":"2025-06-19T14:30:00Z","updated_at":"2025-05-20T08:00:00Z","digest":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","workflow_run":{"id":789012,"repository_id":654321,"head_repository_id":654321,"head_branch":"feature/test-artifact-fetch","head_sha":"abcdef1234567890abcdef1234567890abcdef12"}};
}


import Component from "../components/573";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1234567890,"node_id":"MDg6QXJ0aWZhY3QxMjM0NTY=","name":"sample-artifact-file.zip","size_in_bytes":2048576,"url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/1234567890","archive_download_url":"https://api.example.com/repos/example-org/sample-repo/actions/artifacts/1234567890/zip","expired":false,"created_at":"2025-05-19T14:45:00Z","expires_at":"2025-05-26T14:45:00Z","updated_at":"2025-05-20T10:15:30Z","digest":"d6c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d6","workflow_run":{"id":987654321,"repository_id":11223344,"head_repository_id":11223344,"head_branch":"feature/sample-branch","head_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"}};
}

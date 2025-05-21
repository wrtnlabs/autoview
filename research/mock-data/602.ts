
import Component from "../components/602";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"artifacts":[{"id":1010,"node_id":"MDEyOlBhY3Rpb26zNzE3MTIzNDU=","name":"sample-artifact-1","size_in_bytes":2048,"url":"https://api.example.com/v1/artifacts/1010","archive_download_url":"https://api.example.com/v1/artifacts/1010/download","expired":false,"created_at":"2025-05-18T12:00:00Z","expires_at":"2025-06-18T12:00:00Z","updated_at":"2025-05-19T12:00:00Z","digest":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","workflow_run":{"id":5001,"repository_id":7890,"head_repository_id":7890,"head_branch":"feature/sample","head_sha":"abcd1234ef567890abcd1234ef567890abcd1234"}},{"id":1011,"node_id":"MDEyOlBhY3Rpb26zNzE3MTIzNDY=","name":"test-artifact-2","size_in_bytes":4096,"url":"https://api.example.com/v1/artifacts/1011","archive_download_url":"https://api.example.com/v1/artifacts/1011/download","expired":true,"created_at":null,"expires_at":null,"updated_at":null,"digest":null,"workflow_run":null}]};
}

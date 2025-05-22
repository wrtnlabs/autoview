
import Component from "../components/573";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":98765,"node_id":"NODEID_Artifact_abcXYZ123=","name":"Sample Artifact (Test)","size_in_bytes":204800,"url":"https://api.example.com/v1/artifacts/98765/download","archive_download_url":"https://api.example.com/v1/artifacts/98765/archive","expired":false,"created_at":"2025-05-19T09:30:00Z","expires_at":"2025-06-05T09:30:00Z","updated_at":"2025-05-20T12:00:00Z","digest":"3a7bd3e2360a7d4f1e6c8a9f0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c","workflow_run":{"id":43210,"repository_id":556677,"head_repository_id":556677,"head_branch":"feature/test-artifact","head_sha":"d3adb33f9876543210abcdef1234567890abcdef"}};
}

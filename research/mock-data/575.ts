
import Component from "../components/575";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"actions_caches":[{"id":101,"ref":"refs/heads/main","key":"cache-node-modules-abcdef123456","version":"v1","last_accessed_at":"2025-05-19T14:30:00Z","created_at":"2025-05-18T08:15:00Z","size_in_bytes":2543210},{"id":102,"key":"cache-build-artifacts-sample","created_at":"2025-05-17T09:45:00Z","size_in_bytes":1048576}]};
}

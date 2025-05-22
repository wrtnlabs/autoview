
import Component from "../components/575";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"actions_caches":[{"id":101,"ref":"refs/heads/main","key":"actions-cache-node-modules-sample","version":"v1","last_accessed_at":"2025-05-18T12:00:00Z","created_at":"2025-05-10T08:30:00Z","size_in_bytes":2048000},{"id":102,"ref":"refs/heads/develop","key":"actions-cache-build-artifacts-sample","version":"v2","last_accessed_at":"2025-05-19T09:15:00Z","created_at":"2025-05-11T14:45:00Z","size_in_bytes":4096000},{"id":103,"ref":"refs/heads/feature/sample-feature","key":"actions-cache-libs-sample","last_accessed_at":"2025-05-17T16:20:00Z","created_at":"2025-05-12T07:50:00Z"}]};
}

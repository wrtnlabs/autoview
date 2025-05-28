
import Component from "../components/575";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"actions_caches":[{"id":123,"ref":"refs/heads/sample-branch","key":"cache-node-modules-sample","version":"v2","last_accessed_at":"2025-05-19T14:30:00Z","created_at":"2025-05-01T09:15:00Z","size_in_bytes":102400},{"id":124,"ref":"refs/tags/v1.0-test","key":"cache-build-artifacts-sample","version":"v1","created_at":"2025-04-20T11:00:00Z","size_in_bytes":204800}]};
}

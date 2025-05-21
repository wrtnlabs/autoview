
import Component from "../components/576";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"actions_caches":[{"id":101,"ref":"refs/heads/main","key":"build-cache-main-sample","version":"v1.0.0-test","last_accessed_at":"2025-05-19T14:30:00Z","created_at":"2025-01-10T09:15:00Z","size_in_bytes":52345678},{"id":102,"ref":"refs/heads/develop","key":"build-cache-develop-sample","version":"v2.1.0-test","created_at":"2025-02-15T12:00:00Z"},{"id":103,"ref":"refs/heads/feature/new-ui-sample","key":"dependency-cache-test","size_in_bytes":2048000}]};
}

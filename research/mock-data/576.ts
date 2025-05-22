
import Component from "../components/576";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"actions_caches":[{"id":101,"ref":"refs/heads/main","key":"cache-node-modules-sample","version":"v1","last_accessed_at":"2025-05-19T14:30:00Z","created_at":"2025-05-18T08:15:00Z","size_in_bytes":104857600},{"id":102,"ref":"refs/heads/develop","key":"cache-dependencies-sample","version":"v2","last_accessed_at":"2025-05-19T09:45:30Z","created_at":"2025-05-17T07:00:00Z","size_in_bytes":209715200},{"id":103,"created_at":"2025-05-16T11:20:00Z"}]};
}

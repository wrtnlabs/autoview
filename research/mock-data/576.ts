
import Component from "../components/576";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"actions_caches":[{"id":201,"ref":"refs/heads/main","key":"npm-dependencies-cache-sample","version":"2025-05-01","last_accessed_at":"2025-05-18T08:30:00Z","created_at":"2025-05-01T12:00:00Z","size_in_bytes":5242880},{"id":202,"key":"docker-layer-cache-test","created_at":"2025-04-15T09:45:00Z","size_in_bytes":104857600}]};
}

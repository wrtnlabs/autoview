
import Component from "../components/376";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"repository_cache_usages":[{"full_name":"example-org/sample-repo","active_caches_size_in_bytes":104857600,"active_caches_count":15},{"full_name":"sample-org/project-alpha","active_caches_size_in_bytes":52428800,"active_caches_count":8},{"full_name":"test-org/demo-repo","active_caches_size_in_bytes":0,"active_caches_count":0}]};
}


import Component from "../components/376";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"repository_cache_usages":[{"full_name":"example-org/sample-repo","active_caches_size_in_bytes":12582912,"active_caches_count":3},{"full_name":"test-org/another-repo","active_caches_size_in_bytes":7340032,"active_caches_count":1},{"full_name":"sample-company/dummy-repo","active_caches_size_in_bytes":0,"active_caches_count":0}]};
}

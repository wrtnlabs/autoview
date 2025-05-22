
import Component from "../components/376";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"repository_cache_usages":[{"full_name":"example-org/ui-components-sample","active_caches_size_in_bytes":12345678,"active_caches_count":5},{"full_name":"sample-org/backend-test-service","active_caches_size_in_bytes":987654321,"active_caches_count":12}]};
}

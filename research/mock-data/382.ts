
import Component from "../components/382";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"machine_specs":[{"id":"small_test_runner","cpu_cores":2,"memory_gb":4,"storage_gb":50},{"id":"medium_test_runner","cpu_cores":4,"memory_gb":8,"storage_gb":100},{"id":"large_test_runner","cpu_cores":8,"memory_gb":16,"storage_gb":200}]};
}

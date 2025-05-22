
import Component from "../components/382";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"machine_specs":[{"id":"standard-sample","cpu_cores":2,"memory_gb":7,"storage_gb":14},{"id":"medium-sample","cpu_cores":4,"memory_gb":14,"storage_gb":28},{"id":"large-sample","cpu_cores":8,"memory_gb":32,"storage_gb":64}]};
}

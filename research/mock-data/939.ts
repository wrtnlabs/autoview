
import Component from "../components/939";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"machines":[{"name":"standard-linux","display_name":"Standard Linux (2 vCPU, 0.5 GB RAM, 1 GB SSD) (Test)","operating_system":"Ubuntu Linux","storage_in_bytes":1000000000,"memory_in_bytes":500000000,"cpus":2,"prebuild_availability":"ready"},{"name":"premium-windows","display_name":"Premium Windows (4 vCPU, 1 GB RAM, 2 GB SSD) (Sample)","operating_system":"Windows Server 2022","storage_in_bytes":2000000000,"memory_in_bytes":1000000000,"cpus":4,"prebuild_availability":"in_progress"},{"name":"db-optimized","display_name":"Database Optimized (8 vCPU, 1.5 GB RAM, 1.5 GB SSD) (Sample)","operating_system":"Debian Linux","storage_in_bytes":1500000000,"memory_in_bytes":1500000000,"cpus":8,"prebuild_availability":null}]};
}

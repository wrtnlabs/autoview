
import Component from "../components/939";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":4,"machines":[{"name":"standard-linux-4","display_name":"Standard Linux - 4 CPU, 16 GB RAM, 64 GB SSD","operating_system":"Ubuntu 20.04 LTS","storage_in_bytes":64000000000,"memory_in_bytes":16000000000,"cpus":4,"prebuild_availability":"ready"},{"name":"premium-linux-8","display_name":"Premium Linux - 8 CPU, 32 GB RAM, 128 GB SSD","operating_system":"Ubuntu 22.04 LTS","storage_in_bytes":128000000000,"memory_in_bytes":32000000000,"cpus":8,"prebuild_availability":"in_progress"},{"name":"standard-windows-2","display_name":"Standard Windows - 2 CPU, 8 GB RAM, 32 GB SSD","operating_system":"Windows 10 Pro","storage_in_bytes":32000000000,"memory_in_bytes":8000000000,"cpus":2,"prebuild_availability":"none"},{"name":"high-memory-mac-16","display_name":"High Memory Mac - 16 CPU, 64 GB RAM, 256 GB SSD","operating_system":"macOS Monterey","storage_in_bytes":256000000000,"memory_in_bytes":64000000000,"cpus":16,"prebuild_availability":null}]};
}


import Component from "../components/689";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"machines":[{"name":"standard_linux_2","display_name":"Standard Linux (2 cores, 1 GB RAM, 1 GB storage)","operating_system":"Ubuntu 20.04 LTS","storage_in_bytes":1073741824,"memory_in_bytes":1073741824,"cpus":2,"prebuild_availability":"ready"},{"name":"premium_linux_4","display_name":"Premium Linux (4 cores, 2 GB RAM, 2 GB storage)","operating_system":"Ubuntu 22.04 LTS","storage_in_bytes":2147483647,"memory_in_bytes":2147483647,"cpus":4,"prebuild_availability":"none"},{"name":"basic_windows_2","display_name":"Basic Windows (2 cores, 0.5 GB RAM, 0.5 GB storage)","operating_system":"Windows 10","storage_in_bytes":536870912,"memory_in_bytes":536870912,"cpus":2,"prebuild_availability":"in_progress"}]};
}

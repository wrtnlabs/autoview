
import Component from "../components/689";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":4,"machines":[{"name":"standard-2c-1g-500m","display_name":"2 vCPUs, 1 GB RAM, 500 MB SSD (Standard Sample)","operating_system":"Ubuntu 20.04 LTS (Test)","storage_in_bytes":524288000,"memory_in_bytes":1073741824,"cpus":2,"prebuild_availability":"ready"},{"name":"premium-4c-2g-1g","display_name":"4 vCPUs, 2 GB RAM, 1 GB SSD (Premium Test)","operating_system":"Windows Server 2019 Datacenter (Sample)","storage_in_bytes":1073741824,"memory_in_bytes":2147483640,"cpus":4,"prebuild_availability":"in_progress"},{"name":"gpu-8c-2g","display_name":"8 vCPUs, 2 GB RAM, 2 GB SSD, NVIDIA T4 GPU (Test)","operating_system":"Ubuntu 22.04 LTS (GPU Sample)","storage_in_bytes":2147483640,"memory_in_bytes":2147483640,"cpus":8,"prebuild_availability":"none"},{"name":"micro-1c-512m","display_name":"1 vCPU, 512 MB RAM, 256 MB SSD (Micro Test)","operating_system":"Alpine Linux 3.14 (Test)","storage_in_bytes":268435456,"memory_in_bytes":536870912,"cpus":1,"prebuild_availability":null}]};
}

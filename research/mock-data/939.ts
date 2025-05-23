
import Component from "../components/939";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":4,"machines":[{"name":"standard-linux","display_name":"Standard Linux (2 vCPUs, 512MB RAM, 1GB SSD)","operating_system":"Ubuntu 20.04 LTS","storage_in_bytes":1073741824,"memory_in_bytes":536870912,"cpus":2,"prebuild_availability":"ready"},{"name":"premium-windows","display_name":"Premium Windows (4 vCPUs, 1GB RAM, 2GB SSD)","operating_system":"Windows Server 2019 Datacenter","storage_in_bytes":2147483647,"memory_in_bytes":1073741824,"cpus":4,"prebuild_availability":"none"},{"name":"gpu-accelerated","display_name":"GPU Accelerated (8 vCPUs, 2GB RAM, 1.5GB SSD, NVIDIA T4)","operating_system":"Ubuntu 20.04 LTS (GPU enabled)","storage_in_bytes":1610612736,"memory_in_bytes":2147483647,"cpus":8,"prebuild_availability":"in_progress"},{"name":"micro-linux","display_name":"Micro Linux (1 vCPU, 256MB RAM, 512MB SSD)","operating_system":"Ubuntu 20.04 LTS (Micro)","storage_in_bytes":536870912,"memory_in_bytes":268435456,"cpus":1,"prebuild_availability":null}]};
}

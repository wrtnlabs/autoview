
import Component from "../components/689";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"machines":[{"name":"standard-linux","display_name":"4 Cores • 8 GB RAM • 50 GB SSD (Linux)","operating_system":"linux","storage_in_bytes":53687091200,"memory_in_bytes":8589934592,"cpus":4,"prebuild_availability":"ready"},{"name":"standard-windows","display_name":"8 Cores • 16 GB RAM • 100 GB SSD (Windows)","operating_system":"windows","storage_in_bytes":107374182400,"memory_in_bytes":17179869184,"cpus":8,"prebuild_availability":"none"},{"name":"small-mac","display_name":"2 Cores • 4 GB RAM • 25 GB SSD (macOS)","operating_system":"macOS","storage_in_bytes":26843545600,"memory_in_bytes":4294967296,"cpus":2,"prebuild_availability":null}]};
}

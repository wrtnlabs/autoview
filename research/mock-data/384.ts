
import Component from "../components/384";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Runner Alpha","runner_group_id":5,"image_details":{"id":"img-xyz-001","size_gb":30,"display_name":"Ubuntu 22.04 Image (Test)","source":"github"},"machine_size_details":{"id":"medium","cpu_cores":4,"memory_gb":16,"storage_gb":100},"status":"Ready","platform":"ubuntu-22.04","maximum_runners":15,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"203.0.113.0","length":24},{"enabled":false,"prefix":"198.51.100.0","length":28}],"last_active_on":"2025-05-19T12:34:56Z"};
}


import Component from "../components/385";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Runner Pool (Test)","runner_group_id":5,"image_details":{"id":"img-uuid-sample-001","size_gb":50,"display_name":"Ubuntu 20.04 LTS (Focal) Sample Image","source":"github"},"machine_size_details":{"id":"size-medium-sample","cpu_cores":4,"memory_gb":8,"storage_gb":100},"status":"Ready","platform":"linux","maximum_runners":15,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"192.0.2.0","length":24},{"enabled":true,"prefix":"198.51.100.0","length":24}],"last_active_on":"2025-05-19T14:30:00Z"};
}

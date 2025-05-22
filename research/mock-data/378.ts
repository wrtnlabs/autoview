
import Component from "../components/378";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Hosted Runner (Test)","runner_group_id":200,"image_details":{"id":"ubuntu-20.04-20250519-001","size_gb":15,"display_name":"Ubuntu 20.04 LTS (Sample Image)","source":"github"},"machine_size_details":{"id":"medium","cpu_cores":4,"memory_gb":8,"storage_gb":100},"status":"Ready","platform":"ubuntu-20.04","maximum_runners":5,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"192.0.2.0","length":24},{"enabled":false}],"last_active_on":"2025-05-18T16:45:00Z"};
}

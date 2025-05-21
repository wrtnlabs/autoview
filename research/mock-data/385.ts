
import Component from "../components/385";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Hosted Runner (Test)","runner_group_id":5,"image_details":{"id":"image-uuid-sample-001","size_gb":64,"display_name":"Ubuntu 20.04 LTS Sample Image","source":"github"},"machine_size_details":{"id":"standard-4vcpu-16gb","cpu_cores":4,"memory_gb":16,"storage_gb":128},"status":"Ready","platform":"linux","maximum_runners":15,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"192.0.2.0","length":28}],"last_active_on":"2025-05-19T14:30:00Z"};
}

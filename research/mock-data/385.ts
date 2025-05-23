
import Component from "../components/385";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"sample-hosted-runner (Test)","runner_group_id":5,"image_details":{"id":"img-sample-001","size_gb":50,"display_name":"Ubuntu 20.04 LTS (Sample)","source":"partner"},"machine_size_details":{"id":"standard-xlarge","cpu_cores":8,"memory_gb":32,"storage_gb":500},"status":"Ready","platform":"linux","maximum_runners":15,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"198.51.100.0","length":28},{"enabled":false}],"last_active_on":"2025-05-19T14:30:00Z"};
}


import Component from "../components/378";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Hosted Runner Sample 01","runner_group_id":7,"image_details":{"id":"ubuntu-20.04-sample","size_gb":32,"display_name":"Ubuntu 20.04 LTS (Sample)","source":"github"},"machine_size_details":{"id":"medium-sample","cpu_cores":4,"memory_gb":16,"storage_gb":256},"status":"Ready","platform":"linux","maximum_runners":5,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"192.0.2.0","length":24},{"enabled":false,"prefix":"192.0.3.0","length":28}],"last_active_on":"2025-05-18T12:34:56Z"};
}

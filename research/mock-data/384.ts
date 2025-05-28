
import Component from "../components/384";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Runner (Test)","runner_group_id":200,"image_details":{"id":"img-ubuntu-20-04-test","size_gb":14,"display_name":"Ubuntu 20.04 LTS (Test)","source":"github"},"machine_size_details":{"id":"medium","cpu_cores":4,"memory_gb":16,"storage_gb":128},"status":"Ready","platform":"linux","maximum_runners":5,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"203.0.113.0","length":28}],"last_active_on":"2025-05-18T16:45:00Z"};
}

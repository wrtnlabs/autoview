
import Component from "../components/384";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"sample-hosted-runner-01","runner_group_id":5,"image_details":{"id":"ubuntu-20.04","size_gb":15,"display_name":"Ubuntu 20.04 LTS Sample Image","source":"github"},"machine_size_details":{"id":"Standard_DS4_v2","cpu_cores":4,"memory_gb":16,"storage_gb":100},"status":"Ready","platform":"linux","maximum_runners":20,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"203.0.113.0","length":28},{"enabled":false,"prefix":"203.0.114.0","length":28}],"last_active_on":"2025-05-18T08:30:00Z"};
}

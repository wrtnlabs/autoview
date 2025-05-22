
import Component from "../components/378";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1010,"name":"Sample Runner Pool (Test)","runner_group_id":2002,"image_details":{"id":"img-ubuntu-2004-lts","size_gb":50,"display_name":"Ubuntu 20.04 LTS Sample Image","source":"github"},"machine_size_details":{"id":"medium","cpu_cores":4,"memory_gb":16,"storage_gb":128},"status":"Ready","platform":"ubuntu-20.04","maximum_runners":15,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"203.0.113.0","length":24}],"last_active_on":"2025-05-19T14:35:00Z"};
}

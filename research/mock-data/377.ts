
import Component from "../components/377";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"name":"linux-sample-runner-01","runner_group_id":10,"image_details":{"id":"image-ubuntu2004","size_gb":25,"display_name":"Ubuntu 20.04 LTS (Test)","source":"github"},"machine_size_details":{"id":"medium","cpu_cores":4,"memory_gb":8,"storage_gb":100},"status":"Ready","platform":"linux","maximum_runners":5,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"192.0.2.0","length":24},{"enabled":false,"prefix":"198.51.100.0","length":28}],"last_active_on":"2025-05-18T22:45:00Z"},{"id":102,"name":"windows-sample-runner-01","image_details":null,"machine_size_details":{"id":"xlarge","cpu_cores":8,"memory_gb":16,"storage_gb":200},"status":"Provisioning","platform":"windows","public_ip_enabled":false,"last_active_on":null}]};
}

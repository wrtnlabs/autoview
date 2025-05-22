
import Component from "../components/396";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"name":"Sample Runner A","runner_group_id":200,"image_details":{"id":"img-ubuntu-20-04","size_gb":20,"display_name":"Ubuntu 20.04 (Test)","source":"github"},"machine_size_details":{"id":"standard-small","cpu_cores":2,"memory_gb":7,"storage_gb":14},"status":"Ready","platform":"ubuntu-20.04","maximum_runners":20,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"198.51.100.0","length":24}],"last_active_on":"2025-05-18T16:45:00Z"},{"id":102,"name":"Sample Runner B","image_details":null,"machine_size_details":{"id":"large","cpu_cores":4,"memory_gb":14,"storage_gb":28},"status":"Provisioning","platform":"windows-2019","public_ip_enabled":false,"last_active_on":null}]};
}

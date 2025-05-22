
import Component from "../components/377";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"name":"hosted-runner-1-sample","runner_group_id":201,"image_details":{"id":"img-ubuntu-20-04","size_gb":30,"display_name":"Ubuntu 20.04 LTS (Sample)","source":"github"},"machine_size_details":{"id":"medium","cpu_cores":4,"memory_gb":16,"storage_gb":128},"status":"Ready","platform":"linux","maximum_runners":10,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"192.0.2.0","length":24}],"last_active_on":"2025-05-18T12:34:56Z"},{"id":102,"name":"windows-runner-sample","image_details":null,"machine_size_details":{"id":"large","cpu_cores":8,"memory_gb":32,"storage_gb":256},"status":"Provisioning","platform":"windows","public_ip_enabled":false,"last_active_on":null}]};
}

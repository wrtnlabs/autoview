
import Component from "../components/396";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"name":"runner-alpha-sample","runner_group_id":1001,"image_details":{"id":"ubuntu-20-04","size_gb":10,"display_name":"Ubuntu 20.04 LTS (Sample)","source":"github"},"machine_size_details":{"id":"standard-2x","cpu_cores":4,"memory_gb":16,"storage_gb":100},"status":"Ready","platform":"linux","maximum_runners":5,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"203.0.113.0","length":24}],"last_active_on":"2025-05-18T08:30:00Z"},{"id":102,"name":"runner-beta-test","image_details":null,"machine_size_details":{"id":"large-4x","cpu_cores":8,"memory_gb":32,"storage_gb":200},"status":"Provisioning","platform":"windows","public_ip_enabled":false,"last_active_on":null}]};
}

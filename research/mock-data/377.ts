
import Component from "../components/377";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"name":"runner-ubuntu-20-04-medium-001 (Test)","runner_group_id":500,"image_details":{"id":"img-med-20-04-sample","size_gb":15,"display_name":"Ubuntu 20.04 Medium Sample","source":"github"},"machine_size_details":{"id":"medium","cpu_cores":4,"memory_gb":8,"storage_gb":128},"status":"Ready","platform":"ubuntu-20.04","maximum_runners":5,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"203.0.113.0","length":24},{"enabled":true,"prefix":"198.51.100.0","length":24}],"last_active_on":"2025-05-19T14:30:00Z"},{"id":102,"name":"runner-windows-2019-large-002 (Sample)","image_details":null,"machine_size_details":{"id":"large","cpu_cores":8,"memory_gb":16,"storage_gb":256},"status":"Provisioning","platform":"windows-2019","public_ip_enabled":false,"last_active_on":null}]};
}

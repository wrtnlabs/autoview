
import Component from "../components/396";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runners":[{"id":101,"name":"ubuntu-latest-sample-runner","runner_group_id":500,"image_details":{"id":"img-ubuntu2004-sample","size_gb":20,"display_name":"Ubuntu 20.04 LTS (Sample)","source":"github"},"machine_size_details":{"id":"standard_small","cpu_cores":2,"memory_gb":4,"storage_gb":50},"status":"Ready","platform":"ubuntu-20.04","maximum_runners":5,"public_ip_enabled":false,"last_active_on":"2025-05-18T12:34:56Z"},{"id":202,"name":"windows-server-2019-sample-runner","image_details":null,"machine_size_details":{"id":"high_mem_large","cpu_cores":8,"memory_gb":32,"storage_gb":200},"status":"Provisioning","platform":"windows-server-2019","maximum_runners":10,"public_ip_enabled":true,"public_ips":[{"enabled":true,"prefix":"192.0.2.0","length":24},{"enabled":false,"prefix":"192.0.2.128","length":25}],"last_active_on":null}]};
}

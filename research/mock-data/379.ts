
import Component from "../components/379";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"images":[{"id":"img-ubuntu-20-04-1","platform":"ubuntu-20.04","size_gb":14,"display_name":"Ubuntu 20.04 LTS (Sample)","source":"github"},{"id":"img-windows-2019-1","platform":"windows-2019","size_gb":32,"display_name":"Windows Server 2019 (Test Sample)","source":"partner"},{"id":"img-custom-docker-01","platform":"docker-hosted","size_gb":50,"display_name":"Custom Docker Runner (Dummy)","source":"custom"}]};
}

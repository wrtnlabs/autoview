
import Component from "../components/379";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"images":[{"id":"ubuntu-20.04-202505","platform":"ubuntu-20.04","size_gb":14,"display_name":"Ubuntu 20.04 (Focal Fossa) (Test)","source":"github"},{"id":"windows-2022-sample","platform":"windows-2022","size_gb":30,"display_name":"Windows Server 2022 Datacenter (Sample)","source":"partner"},{"id":"self-hosted-gpu-large","platform":"self-hosted-linux","size_gb":64,"display_name":"Self-Hosted GPU Runner XL (Dummy)","source":"custom"}]};
}

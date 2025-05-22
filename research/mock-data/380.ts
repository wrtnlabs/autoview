
import Component from "../components/380";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"images":[{"id":"ubuntu-20.04-lts-sample","platform":"ubuntu","size_gb":14,"display_name":"Ubuntu 20.04 LTS (Sample)","source":"github"},{"id":"windows-2019-test","platform":"windows","size_gb":20,"display_name":"Windows Server 2019 (Test)","source":"partner"},{"id":"macos-12-montery-dummy","platform":"macos","size_gb":12,"display_name":"macOS 12 Monterey (Dummy)","source":"custom"}]};
}

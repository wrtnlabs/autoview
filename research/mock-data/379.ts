
import Component from "../components/379";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"images":[{"id":"img-ubuntu-2004-sample-001","platform":"ubuntu-20.04","size_gb":14,"display_name":"Ubuntu 20.04 LTS (Sample)","source":"github"},{"id":"img-win2019-test-042","platform":"windows-2019","size_gb":21,"display_name":"Windows Server 2019 (Test)","source":"custom"}]};
}

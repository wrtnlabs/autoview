
import Component from "../components/380";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"images":[{"id":"101","platform":"ubuntu-22.04","size_gb":14,"display_name":"Ubuntu 22.04 (Sample)","source":"github"},{"id":"202","platform":"windows-2022","size_gb":14,"display_name":"Windows Server 2022 (Test)","source":"github"},{"id":"303","platform":"macos-11","size_gb":16,"display_name":"macOS 11 Big Sur (Sample)","source":"partner"}]};
}

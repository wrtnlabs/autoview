
import Component from "../components/380";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"images":[{"id":"win2019-123-test","platform":"Windows Server 2019","size_gb":14,"display_name":"Windows Server 2019 with GitHub Actions Runner (Sample)","source":"github"},{"id":"ubuntu2004-456-partner","platform":"Ubuntu 20.04 LTS","size_gb":10,"display_name":"Ubuntu 20.04 LTS - Partner Hosted Runner (Test)","source":"partner"},{"id":"macos11-789-custom","platform":"macOS 11.00 Big Sur","size_gb":15,"display_name":"macOS 11 Big Sur Custom Runner (Dummy)","source":"custom"}]};
}

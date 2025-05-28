
import Component from "../components/398";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"runners":[{"id":101,"runner_group_id":10,"name":"Sample Runner A (Test)","os":"ubuntu-latest","status":"online","busy":false,"labels":[{"id":1,"name":"self-hosted","type":"read-only"},{"id":101,"name":"ubuntu","type":"custom"}],"ephemeral":false},{"id":102,"name":"Sample Runner B (Test)","os":"windows-latest","status":"offline","busy":false,"labels":[{"name":"custom-windows","type":"custom"}],"ephemeral":true},{"id":103,"runner_group_id":10,"name":"Sample Runner C (Test)","os":"macos-latest","status":"online","busy":true,"labels":[{"id":3,"name":"macos"}]}]};
}

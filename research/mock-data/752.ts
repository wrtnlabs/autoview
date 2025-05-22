
import Component from "../components/752";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"ref":"refs/heads/feature/sample-test","node_id":"NODEID_git_ref_abc123XYZ=","url":"https://api.example.com/repos/example-org/sample-repo/git/refs/heads/feature/sample-test","object":{"type":"commit","sha":"0123456789abcdef0123456789abcdef01234567","url":"https://api.example.com/repos/example-org/sample-repo/git/commits/0123456789abcdef0123456789abcdef01234567"}};
}

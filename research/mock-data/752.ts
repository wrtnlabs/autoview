
import Component from "../components/752";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"ref":"refs/heads/sample-branch","node_id":"MDM6UmVmUmVmcy9oZWFkcy9zYW1wbGVicmFuY2g=","url":"https://api.example.com/repos/example-org/sample-repo/git/refs/heads/sample-branch","object":{"type":"branch","sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/git/commits/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"}};
}

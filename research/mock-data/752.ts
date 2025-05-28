
import Component from "../components/752";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"ref":"refs/heads/feature/sample-branch","node_id":"MDM6UmVmMTIzNDU2Nzg5OnJlZl9zYW1wbGVfc2FuY2g=","url":"https://api.example.com/repos/example-org/sample-repo/git/refs/heads/feature/sample-branch","object":{"type":"commit","sha":"f1e2d3c4b5a6978877665544332211a0b9c8d7e6","url":"https://api.example.com/repos/example-org/sample-repo/git/commits/f1e2d3c4b5a6978877665544332211a0b9c8d7e6"}};
}

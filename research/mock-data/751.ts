
import Component from "../components/751";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"ref":"refs/heads/sample-feature-test","node_id":"REF_NODEID_SAMPLE_abc123XYZ=","url":"https://api.example.com/repos/example-org/sample-repo/git/refs/heads/sample-feature-test","object":{"type":"commit","sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/git/commits/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"}};
}

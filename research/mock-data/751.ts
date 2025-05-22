
import Component from "../components/751";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"ref":"refs/heads/feature/sample-update","node_id":"REF_nodeid_sampleABC123==","url":"https://api.example.com/repos/example-org/sample-repo/git/refs/heads/feature%2Fsample-update","object":{"type":"commit","sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/git/commits/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"}};
}
